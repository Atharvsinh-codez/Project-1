import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  submitLabel: string;
  isSubmitting?: boolean;
}

/**
 * Wrapper component for Authentication pages.
 * Includes the Card shell, Social Logins, and Form container.
 */
export const AuthCard = ({
  title,
  description,
  children,
  submitLabel,
  isSubmitting = false,
}: AuthCardProps) => {
  return (
    <Card className="w-full sm:max-w-[600px] z-20 px-6 py-10 md:px-10 md:py-16 rounded-3xl border-none shadow-2xl shadow-zinc-700/20 bg-white/90 backdrop-blur-sm mx-4">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-bold text-center mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-md font-semibold text-zinc-700 text-center mb-5">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex gap-5 flex-col">
        {/* Main Submit Button - logic is handled by the form ID in the child */}
        <Button
          type="submit"
          form="auth-form" // This ID must match the form tag in the parent
          disabled={isSubmitting}
          className="w-full text-lg font-semibold bg-[#fcb65a] text-black py-6 my-2 cursor-pointer hover:bg-transparent border-2 border-[#fcb65a] hover:border-zinc-300 transition-all"
        >
          {isSubmitting ? "Loading..." : submitLabel}
        </Button>

        {/* Divider */}
        <div className="flex gap-3 items-center w-full justify-center">
          <div className="h-[2px] rounded-full w-7 bg-zinc-800"></div>
          <span className="text-sm font-semibold text-zinc-800">
            Or {submitLabel} with
          </span>
          <div className="h-[2px] rounded-full w-7 bg-zinc-800"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-5 justify-center w-full">
          <SocialButton provider="google" label="Google" />
          <SocialButton provider="twitter" label="Twitter" />
        </div>
      </CardFooter>
    </Card>
  );
};

// Sub-component for Social Buttons to keep the main component clean
const SocialButton = ({
  provider,
  label,
}: {
  provider: string;
  label: string;
}) => (
  <button
    type="button"
    className="border-2 border-zinc-200 rounded-md px-5 py-3 font-bold text-zinc-900 flex gap-2 items-center hover:bg-zinc-50 transition-colors bg-white"
  >
    <img
      src={`/images/auth/${provider}.png`}
      alt={`${label} logo`}
      className="h-6 w-6"
      onError={(e) => (e.currentTarget.style.display = "none")}
      loading="lazy"
    />
    {label}
  </button>
);
