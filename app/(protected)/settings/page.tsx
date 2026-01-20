"use client";

import React, { useState } from "react";
import { useUser } from "@/services/auth/model/hooks/useUser";
import {
  Wallet,
  Shield,
  Bell,
  User,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  X,
} from "lucide-react";

export default function SettingsPage() {
  const { data: user } = useUser();
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  });
  const [kycStatus] = useState("pending"); // Mock KYC status

  const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const maskedAddress = `${mockWalletAddress.slice(
    0,
    6
  )}...${mockWalletAddress.slice(-4)}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Settings
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage your account preferences and security settings.
          </p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Settings */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Information
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Connected Wallet
            </label>
            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
              <Wallet className="h-5 w-5 text-zinc-600" />
              <span className="font-mono text-sm text-zinc-900">
                {showWalletAddress ? mockWalletAddress : maskedAddress}
              </span>
              <button
                onClick={() => setShowWalletAddress(!showWalletAddress)}
                className="ml-auto text-zinc-400 hover:text-zinc-600"
              >
                {showWalletAddress ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-zinc-50 rounded-lg">
              <p className="text-2xl font-bold text-zinc-900">12</p>
              <p className="text-sm text-zinc-500">Tokens Held</p>
            </div>
            <div className="text-center p-4 bg-zinc-50 rounded-lg">
              <p className="text-2xl font-bold text-zinc-900">$12.4K</p>
              <p className="text-sm text-zinc-500">Portfolio Value</p>
            </div>
            <div className="text-center p-4 bg-zinc-50 rounded-lg">
              <p className="text-2xl font-bold text-zinc-900">89</p>
              <p className="text-sm text-zinc-500">Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Status */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verification & KYC
          </h2>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-zinc-900">Identity Verification</p>
              <p className="text-sm text-zinc-500 mt-1">
                Complete KYC to unlock higher investment limits and additional
                features.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  kycStatus === "verified"
                    ? "text-green-700 bg-green-50"
                    : kycStatus === "pending"
                    ? "text-yellow-700 bg-yellow-50"
                    : "text-red-700 bg-red-50"
                }`}
              >
                {kycStatus === "verified" ? (
                  <Shield className="h-4 w-4" />
                ) : kycStatus === "pending" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span className="capitalize">{kycStatus}</span>
              </div>
              {kycStatus !== "verified" && (
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                  {kycStatus === "pending"
                    ? "Complete KYC"
                    : "Start Verification"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {[
            {
              key: "email",
              label: "Email Notifications",
              description:
                "Receive updates about your investments and platform news",
            },
            {
              key: "push",
              label: "Push Notifications",
              description: "Get instant notifications on your device",
            },
            {
              key: "sms",
              label: "SMS Notifications",
              description: "Receive important alerts via text message",
            },
            {
              key: "marketing",
              label: "Marketing Communications",
              description:
                "Receive promotional offers and new feature announcements",
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-zinc-900">{label}</p>
                <p className="text-sm text-zinc-500">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50 shadow-sm overflow-hidden">
        <div className="border-b border-red-100 bg-red-50 px-6 py-4">
          <h2 className="font-semibold text-red-900">Danger Zone</h2>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900">Disconnect Wallet</p>
              <p className="text-sm text-red-700 mt-1">
                This will disconnect your wallet from the platform. You can
                reconnect at any time.
              </p>
            </div>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
