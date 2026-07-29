"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, false);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login Successfully");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
    if (!state.success) {
      toast.error(state.message || "Login failed!");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-3">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />
        <Button type="submit">{pending ? "Submitting..." : "Login"}</Button>
      </Card>
      <div className="text-center text-sm text-muted-foreground mt-2">
        <span>Don't have an account? </span>
        <Link
          href="/auth/register"
          className="text-primary hover:underline font-medium"
        >
          Create an Account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
