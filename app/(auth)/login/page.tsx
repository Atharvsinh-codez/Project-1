"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Imports
import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/components/auth/auth-card";
import { CustomFormField } from "@/components/ui/custom-form-field";
import { loginSchema, LoginFormValues } from "@/lib/schemas/auth-schema";

// Feature Imports (Adjust path if necessary based on your folder structure)
import { useAuth } from "@/services/auth/model/hooks/useAuth";

const LoginPage = () => {
  // 1. Integrate TanStack Query Hook
  const { login, isLoggingIn } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  function onSubmit(data: LoginFormValues) {
    // 2. Execute Mutation
    // We pass the form data to the login function
    login(data, {
      onSuccess: () => {
        toast.success("Welcome back!", {
          description: "You have successfully logged in.",
        });
        // Note: Redirection is handled inside useAuth's onSuccess
      },
      onError: (error) => {
        // 3. Handle Errors
        // Display the specific error message from the backend (e.g., "Invalid credentials")
        toast.error("Login failed", {
          description:
            error.message || "Something went wrong. Please try again.",
        });

        // Optional: Reset password field on error for better UX
        form.resetField("password");
      },
    });
  }

  return (
    <AuthCard
      title="Login"
      description="Welcome back! Enter your credentials to continue."
      submitLabel="Sign In"
      // 4. Bind Loading State
      // We use isLoggingIn from TanStack Query instead of form.formState.isSubmitting
      isSubmitting={isLoggingIn}
    >
      <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-2">
          <CustomFormField
            control={form.control}
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoggingIn}
          />
          <CustomFormField
            control={form.control}
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            description="Must be between 6–32 characters."
            disabled={isLoggingIn}
          />
        </FieldGroup>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
