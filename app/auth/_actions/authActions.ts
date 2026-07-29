'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from 'jsonwebtoken'


type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<any> => {
  const fullName = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    fullName,
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

    return result;

};


type LoginState = {
  success: Boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};


export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    // const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    // // if (decodedToken.role === "CUSTOMER") {
    // //   redirect("/dashboard/customer");
    // // } else if (decodedToken.role === "ADMIN") {
    // //   redirect("/dashboard/admin");
    // // }else if(decodedToken.role === "PROVIDER"){
    // //   redirect("/dashboard/provider")
    // // }
  }
  return result;
};