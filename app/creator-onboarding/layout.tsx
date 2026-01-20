import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Creator Platform",
  description: "Join the creator economy.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
