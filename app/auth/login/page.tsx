import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import LoginForm from "../_components/LoginForm";
import { Suspense } from "react";

function LoginSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="p-5 space-y-3 rounded-xl border shadow-sm bg-white dark:bg-slate-950">
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-full bg-slate-300 dark:bg-slate-700 rounded-md flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-slate-500 animate-spin" />
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </div>
  );
}
export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-64.9px)] p-4 items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          {/* FORM GENERIC TEXT */}
          <div className="space-y-2 text-center ">
            <h1 className="text-3xl font-bold ">Welcome Back!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          {/* FORM */}
          <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
          </Suspense>
          <div className="  text-center font-bold">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
