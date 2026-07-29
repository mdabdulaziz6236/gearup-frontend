import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROUTES = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookiesStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? await jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? await jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    // access Token has expired but refresh Token is valid, get new access Token from backend
    const result = await getNewAccessToken();
    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookiesStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = await jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;
  if (decodedAccessToken?.success) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (!decodedAccessToken?.success) {
    // token has expired or is invalid, clear the cookies
    cookiesStore.delete("accessToken");

  }

  // user is logged in and trying to access Auth routes , redirect to root or dashboard;
  if (decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }


const isProtectedRoute = PROTECTED_ROUTES.some(
  (route) => pathname === route || pathname.startsWith(route + "/")
);

// Authenticated pages protection
if (isProtectedRoute && !decodedAccessToken?.success) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}


    if (pathname === "/dashboard") {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
    if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  // Authorization
  if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/dashboard/provider") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
