"use client";

import React from "react";
import { useUser } from "@/services/auth/model/hooks/useUser";
import { StatCard } from "@/components/dashboard/StatCard";
import { CreatorCard } from "@/components/dashboard/CreatorCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

// Mock data - will be replaced with real API calls
const mockStats = [
  {
    title: "Portfolio Value",
    value: "$12,450.00",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Total Tokens",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active IPOs",
    value: "8",
    change: "2 ending soon",
    changeType: "neutral" as const,
    icon: TrendingUp,
  },
  {
    title: "Transactions",
    value: "156",
    change: "+12 this week",
    changeType: "positive" as const,
    icon: Activity,
  },
];

const mockFeaturedIPOs = [
  {
    id: "1",
    creator: "Alex Chen",
    name: "TechVision Studios",
    description: "AI-powered video creation tools for content creators",
    progress: 75,
    target: "$500K",
    raised: "$375K",
    daysLeft: 12,
    category: "Technology",
    avatar: "https://placehold.co/40x40?text=AC",
  },
  {
    id: "2",
    creator: "Sarah Johnson",
    name: "FitLife Academy",
    description: "Personalized fitness and nutrition coaching platform",
    progress: 60,
    target: "$300K",
    raised: "$180K",
    daysLeft: 18,
    category: "Health & Fitness",
    avatar: "https://placehold.co/40x40?text=SJ",
  },
  {
    id: "3",
    creator: "Marcus Rodriguez",
    name: "GameDev Pro",
    description: "Professional game development tools and assets",
    progress: 90,
    target: "$750K",
    raised: "$675K",
    daysLeft: 5,
    category: "Gaming",
    avatar: "https://placehold.co/40x40?text=MR",
  },
];

const mockTrendingCreators = [
  {
    id: "1",
    name: "Emma Davis",
    category: "Digital Art",
    followers: "125K",
    tokenPrice: "$2.45",
    change: "+15.2%",
    avatar: "https://placehold.co/48x48?text=ED",
  },
  {
    id: "2",
    name: "Jordan Lee",
    category: "Music Production",
    followers: "89K",
    tokenPrice: "$3.12",
    change: "+8.7%",
    avatar: "https://placehold.co/48x48?text=JL",
  },
  {
    id: "3",
    name: "Priya Patel",
    category: "Content Creation",
    followers: "67K",
    tokenPrice: "$1.89",
    change: "-2.1%",
    avatar: "https://placehold.co/48x48?text=PP",
  },
];

export default function DashboardPage() {
  const { data: user } = useUser();

  return (
    <div className="space-y-8 bg-white rounded-xl p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="text-zinc-400 mt-1 text-lg">
            Your creator investments, all in one place.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {mockStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Featured IPOs Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-medium text-zinc-900">
              Featured IPOs
            </h2>
            <p className="text-zinc-400 mt-1">
              Discover new creator opportunities before they go public.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeaturedIPOs.map((ipo) => (
            <CreatorCard key={ipo.id} {...ipo} />
          ))}
        </div>
      </div>

      {/* Trending Creators Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-medium text-zinc-900">
              Trending Creators
            </h2>
            <p className="text-zinc-400 mt-1">
              Creators gaining momentum in the market.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrendingCreators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#f9efe3] flex items-center justify-center text-zinc-900 font-semibold text-sm">
                  {creator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900">
                    {creator.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{creator.category}</p>
                  <p className="text-xs text-zinc-400">
                    {creator.followers} followers
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-zinc-900">
                    {creator.tokenPrice}
                  </p>
                  <p
                    className={`text-sm ${
                      creator.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {creator.change}
                  </p>
                </div>
                <button className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
