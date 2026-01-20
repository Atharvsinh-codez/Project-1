"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/components/auth/auth-card";
import { CustomFormField } from "@/components/ui/custom-form-field";
import { signupSchema, SignupFormValues } from "@/lib/schemas/auth-schema";

// 1. Import the custom hook
import { useAuth } from "@/services/auth/model/hooks/useAuth";

const SignupPage = () => {
  // 2. Destructure register function and loading state
  const { register, isRegistering } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: SignupFormValues) {
    // 3. Trigger the mutation
    // We explicitly exclude confirmPassword as the backend doesn't need it
    register(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!", {
            description: "Redirecting you to login...",
          });
          // Redirect is handled inside useAuth, or you can do it here manually
        },
        onError: (error) => {
          toast.error("Registration failed", {
            description:
              error.message || "Please check your details and try again.",
          });
        },
      }
    );
  }

  return (
    <AuthCard
      title="Create Account"
      description="Join us today! Enter your details below."
      submitLabel="Sign Up"
      // 4. Bind the correct loading state
      isSubmitting={isRegistering}
    >
      <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-2">
          <CustomFormField
            control={form.control}
            name="name"
            placeholder="Full Name"
            autoComplete="name"
            disabled={isRegistering}
          />
          <CustomFormField
            control={form.control}
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isRegistering}
          />
          <CustomFormField
            control={form.control}
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            description="Must start with a letter and contain at least 8 characters."
            disabled={isRegistering}
          />
          <CustomFormField
            control={form.control}
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            disabled={isRegistering}
          />
        </FieldGroup>
      </form>
    </AuthCard>
  );
};

export default SignupPage;
