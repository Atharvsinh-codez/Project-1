"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Building,
  Briefcase,
  Activity,
  Settings,
  Menu,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "@/services/auth/model/hooks/useAuth";
import { useUser } from "@/services/auth/model/hooks/useUser";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Market", href: "/market", icon: TrendingUp },
  { name: "IPOs", href: "/ipos", icon: Building },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Activity", href: "/activity", icon: Activity },
];

const general = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user, isLoading } = useUser();
  const { logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.info("Logged out", {
          description: "You have been safely logged out.",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // This should be handled by page-level protection
  }

  return (
    <div className="flex min-h-screen bg-[#f9efe3] py-5 pl-2 pr-5">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-[#f9efe3] pl-5 py-5 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col bg-white rounded-xl">
          {/* Logo */}
          <div className="flex items-center gap-3 py-10 px-7">
            <img
              src="/images/logo/logo-icon.jpeg"
              alt="Logo"
              className="h-12 w-12 rounded-lg"
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/32x32?text=L")
              }
            />
            <img
              src="/images/logo/logo-name-dark.png"
              alt="Brand"
              className="h-8"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>

          {/* Navigation */}
          <div className="py-4 px-5 text-sm font-semibold text-zinc-400">
            MENU
          </div>
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div
                    className={`w-2.5 mr-5 h-10 ${
                      isActive ? "bg-[#F2723B]" : "bg-none"
                    } rounded-r-2xl`}
                  ></div>
                  <item.icon
                    className={cn(
                      "h-6 w-6 shrink-0",
                      isActive
                        ? "text-[#F2723B]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    )}
                  />
                  <div
                    className={`text-xl ${
                      isActive ? "text-zinc-800 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="py-4 px-5 text-sm font-semibold text-zinc-400">
            GENERAL
          </div>
          <nav className="flex-1 space-y-2">
            {general.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div
                    className={`w-2.5 mr-5 h-10 ${
                      isActive ? "bg-[#F2723B]" : "bg-none"
                    } rounded-r-2xl`}
                  ></div>
                  <item.icon
                    className={cn(
                      "h-6 w-6 shrink-0",
                      isActive
                        ? "text-[#F2723B]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    )}
                  />
                  <div
                    className={`text-xl ${
                      isActive ? "text-zinc-800 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-14 w-14 rounded-full bg-orange-100 flex items-center justify-center text-zinc-600 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-zinc-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-80">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-zinc-600"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo/logo-icon.jpeg"
              alt="Logo"
              className="h-6 w-6 rounded"
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/24x24?text=L")
              }
            />
            <span className="font-semibold text-zinc-900">
              Creator Stock Exchange
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
