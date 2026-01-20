"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { TokenTable } from "@/components/dashboard/TokenTable";

// Mock data
const mockTokens = [
  {
    id: "1",
    creator: "Emma Davis",
    category: "Digital Art",
    price: "$2.45",
    change: "+$0.23",
    changePercent: "+10.4%",
    volume: "$12.5K",
    marketCap: "$245K",
    avatar: "https://placehold.co/32x32?text=ED",
  },
  {
    id: "2",
    creator: "Jordan Lee",
    category: "Music Production",
    price: "$3.12",
    change: "+$0.27",
    changePercent: "+9.5%",
    volume: "$8.9K",
    marketCap: "$312K",
    avatar: "https://placehold.co/32x32?text=JL",
  },
  {
    id: "3",
    creator: "Priya Patel",
    category: "Content Creation",
    price: "$1.89",
    change: "-$0.04",
    changePercent: "-2.1%",
    volume: "$15.2K",
    marketCap: "$189K",
    avatar: "https://placehold.co/32x32?text=PP",
  },
  {
    id: "4",
    creator: "Marcus Rodriguez",
    category: "Gaming",
    price: "$4.67",
    change: "+$0.45",
    changePercent: "+10.7%",
    volume: "$22.1K",
    marketCap: "$467K",
    avatar: "https://placehold.co/32x32?text=MR",
  },
  {
    id: "5",
    creator: "Sarah Johnson",
    category: "Health & Fitness",
    price: "$2.98",
    change: "+$0.15",
    changePercent: "+5.3%",
    volume: "$9.8K",
    marketCap: "$298K",
    avatar: "https://placehold.co/32x32?text=SJ",
  },
];

const categories = [
  "All Categories",
  "Digital Art",
  "Music Production",
  "Content Creation",
  "Gaming",
  "Health & Fitness",
  "Technology",
  "Writing",
];

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("marketCap");

  const filteredTokens = mockTokens.filter((token) => {
    const matchesSearch = token.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || token.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Market
          </h1>
          <p className="text-zinc-500 mt-1">
            Discover and trade creator tokens.
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
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="marketCap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
            <option value="volume">Volume</option>
          </select>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Total Market Cap</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">$2.4M</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">24h Volume</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">$68.6K</p>
          <p className="text-sm text-green-600 mt-2">+8.2% from yesterday</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Active Traders</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">1,247</p>
          <p className="text-sm text-green-600 mt-2">+15.3% from last week</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Listed Creators</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">89</p>
          <p className="text-sm text-green-600 mt-2">+5 new this week</p>
        </div>
      </div>

      {/* Token Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">Creator Tokens</h2>
          <span className="text-sm text-zinc-500">
            {filteredTokens.length} of {mockTokens.length} tokens
          </span>
        </div>
        <TokenTable tokens={filteredTokens} />
      </div>
    </div>
  );
}


