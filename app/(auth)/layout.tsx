"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <main className="flex h-dvh w-dvw bg-[#F9EFE3] relative items-center justify-center overflow-hidden">
      {/* --- TOP NAVIGATION (Shared) --- */}
      <div className="fixed top-0 w-full px-5 md:px-20 py-6 md:py-10 flex justify-between items-center z-20">
        <div className="flex gap-3 items-center">
          <img
            src="/images/logo/logo-icon.png"
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/48x48?text=L")
            }
          />
          <img
            src="/images/logo/logo-name-dark.png"
            alt="Brand"
            className="h-6 md:h-8"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="flex gap-3 md:gap-5 items-center">
          <span className="text-zinc-800 font-medium hidden sm:inline-block">
            {isLoginPage
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Link href={isLoginPage ? "/signup" : "/login"}>
            <button className="px-5 py-2 md:px-7 md:py-3 bg-[#fcb65a] rounded-md font-semibold text-zinc-900 border-2 border-[#fcb65a] hover:bg-transparent hover:border-zinc-300 transition-all text-sm md:text-base">
              {isLoginPage ? "Sign Up" : "Sign In"}
            </button>
          </Link>
        </div>
      </div>

      {/* --- BACKGROUND IMAGES (Shared) --- */}
      <img
        src="/images/auth/bg-person.jpeg"
        alt=""
        className="w-1/2 h-full object-contain opacity-75 absolute top-0 left-10 pointer-events-none hidden lg:block"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="/images/auth/bg.jpeg"
        alt=""
        className="w-1/2 h-full object-contain opacity-75 absolute top-0 right-10 pointer-events-none hidden lg:block"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* --- PAGE CONTENT --- */}
      {children}
    </main>
  );
}
