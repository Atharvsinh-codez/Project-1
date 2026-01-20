"use client";

import React, { useState } from "react";
import { Clock, TrendingUp, Search, Filter } from "lucide-react";

// Mock IPO data
const mockIPOs = [
  {
    id: "1",
    creator: "Alex Chen",
    name: "TechVision Studios",
    description:
      "AI-powered video creation tools for content creators. Revolutionizing how creators produce and edit video content with machine learning.",
    progress: 75,
    target: "$500K",
    raised: "$375K",
    minInvestment: "$100",
    maxInvestment: "$50K",
    daysLeft: 12,
    category: "Technology",
    avatar: "https://placehold.co/48x48?text=AC",
    backers: 247,
    valuation: "$2.5M",
  },
  {
    id: "2",
    creator: "Sarah Johnson",
    name: "FitLife Academy",
    description:
      "Personalized fitness and nutrition coaching platform. Using AI to create custom workout plans and meal prep guidance.",
    progress: 60,
    target: "$300K",
    raised: "$180K",
    minInvestment: "$50",
    maxInvestment: "$25K",
    daysLeft: 18,
    category: "Health & Fitness",
    avatar: "https://placehold.co/48x48?text=SJ",
    backers: 189,
    valuation: "$1.8M",
  },
  {
    id: "3",
    creator: "Marcus Rodriguez",
    name: "GameDev Pro",
    description:
      "Professional game development tools and assets marketplace. Connecting indie developers with high-quality game assets and tools.",
    progress: 90,
    target: "$750K",
    raised: "$675K",
    minInvestment: "$200",
    maxInvestment: "$100K",
    daysLeft: 5,
    category: "Gaming",
    avatar: "https://placehold.co/48x48?text=MR",
    backers: 456,
    valuation: "$4.2M",
  },
  {
    id: "4",
    creator: "Priya Patel",
    name: "ContentFlow",
    description:
      "All-in-one content management and scheduling platform for social media creators. Streamline your content workflow.",
    progress: 45,
    target: "$400K",
    raised: "$180K",
    minInvestment: "$75",
    maxInvestment: "$30K",
    daysLeft: 22,
    category: "Content Creation",
    avatar: "https://placehold.co/48x48?text=PP",
    backers: 134,
    valuation: "$2.1M",
  },
  {
    id: "5",
    creator: "David Kim",
    name: "MusicMaster AI",
    description:
      "AI-powered music production and mixing tools. Democratizing professional music production for creators worldwide.",
    progress: 30,
    target: "$600K",
    raised: "$180K",
    minInvestment: "$150",
    maxInvestment: "$75K",
    daysLeft: 28,
    category: "Music Production",
    avatar: "https://placehold.co/48x48?text=DK",
    backers: 98,
    valuation: "$3.0M",
  },
];

export default function IPOsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("daysLeft");

  const categories = [
    "All Categories",
    "Technology",
    "Health & Fitness",
    "Gaming",
    "Content Creation",
    "Music Production",
    "Digital Art",
  ];

  const filteredIPOs = mockIPOs.filter((ipo) => {
    const matchesSearch =
      ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      ipo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedIPOs = [...filteredIPOs].sort((a, b) => {
    switch (sortBy) {
      case "progress":
        return b.progress - a.progress;
      case "daysLeft":
        return a.daysLeft - b.daysLeft;
      case "raised":
        return (
          parseFloat(b.raised.replace(/[$,K]/g, "")) -
          parseFloat(a.raised.replace(/[$,K]/g, ""))
        );
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8 bg-white rounded-xl p-10 min-h-[96.3vh]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900">
            Initial Public Offerings
          </h1>
          <p className="text-zinc-400 text-lg mt-1">
            Invest in creator ventures before they go public.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search IPOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2723B] focus:border-[#F2723B]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-[#F2723B] focus:border-[#F2723B]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-[#F2723B] focus:border-{#F2723B]"
          >
            <option value="daysLeft">Ending Soon</option>
            <option value="progress">Most Funded</option>
            <option value="raised">Highest Raised</option>
          </select>
        </div>
      </div>

      {/* IPO Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-3xl bg-[#F2723B] p-7">
          <p className="text-lg font-medium text-gray-200">Active IPOs</p>
          <p className="text-[2.8rem] font-bold text-white mt-1">12</p>
          <p className="text-sm text-[#f7e1c5] mt-2">3 ending this week</p>
        </div>
        <div className="rounded-3xl bg-[#f9efe3] p-7">
          <p className="text-lg font-medium text-zinc-900">Total Raised</p>
          <p className="text-[2.8rem] font-bold text-zinc-900 mt-1">$2.8M</p>
          <p className="text-sm text-[#F2723B] mt-2">+24.5% this month</p>
        </div>
        <div className="rounded-3xl bg-[#f9efe3] p-7">
          <p className="text-lg font-medium text-zinc-900">Avg. Success Rate</p>
          <p className="text-[2.8rem] font-bold text-zinc-900 mt-1">78%</p>
          <p className="text-sm text-[#F2723B] mt-2">+5% from last quarter</p>
        </div>
        <div className="rounded-3xl bg-[#f9efe3] p-7">
          <p className="text-lg font-medium text-zinc-900">Total Investors</p>
          <p className="text-[2.8rem] font-bold text-zinc-900 mt-1">1,543</p>
          <p className="text-sm text-[#F2723B] mt-2">+18.2% this month</p>
        </div>
      </div>

      {/* IPO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedIPOs.map((ipo) => (
          <div
            key={ipo.id}
            className="rounded-3xl border border-zinc-200 bg-white p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-[#f9efe3] flex items-center justify-center text-zinc-900 font-semibold text-sm">
                {ipo.creator
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">{ipo.name}</h3>
                <p className="text-sm text-zinc-500">by {ipo.creator}</p>
              </div>
              <span className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-600 border border-zinc-300">
                {ipo.category}
              </span>
            </div>

            <p className="text-sm text-zinc-600 mb-4 line-clamp-3">
              {ipo.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-zinc-900">{ipo.raised}</span>
                <span className="text-zinc-500">{ipo.target}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div
                  className="bg-[#F2723B] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${ipo.progress}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {ipo.progress}% funded • {ipo.backers} backers
              </p>
            </div>

            {/* Investment Info */}
            <div className="bg-zinc-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500">Min Investment</p>
                  <p className="font-medium text-zinc-900">
                    {ipo.minInvestment}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">Valuation</p>
                  <p className="font-medium text-zinc-900">{ipo.valuation}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-zinc-500">
                <Clock className="h-4 w-4" />
                <span>{ipo.daysLeft} days left</span>
              </div>
              <button className="rounded-lg bg-[#F2723B] px-4 py-2 text-sm font-medium text-white hover:bg-[#f2723be1] transition-colors">
                Participate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
