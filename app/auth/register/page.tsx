import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-65px)] p-4 bg-background flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center ">
          <h1 className="text-3xl font-bold ">Welcome Back!</h1>
          <p className="text-gray-500">
            Enter your credentials to set up your profile
          </p>
        </div>
        <RegisterForm />
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
  );
};

export default RegisterPage;