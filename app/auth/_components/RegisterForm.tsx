"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { registerAction } from "../_actions/authActions";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, false);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(state.message || "Registration failed!");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-3">
        {/* Name Input */}
        <Input
          name="name"
          type="text"
          placeholder="Enter Your Name"
          required
          disabled={pending}
        />

        {/* Email Input */}
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
          disabled={pending}
        />

        {/* Password Input */}
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
          disabled={pending}
        />

        {/* Profile Photo URL Input */}
        {/* <Input
          name="profilePhoto"
          type="text"
          placeholder="Profile Photo URL (e.g., www.profile.com)"
          required
          disabled={pending}
        /> */}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={pending}
        >
          {pending ? "Creating Account..." : "Register"}
        </Button>
      </Card>

      {/* Login Page Link */}
      <div className="text-center text-sm text-muted-foreground mt-2">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Login here
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
