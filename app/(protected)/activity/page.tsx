"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Building,
  Clock,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";

// Mock activity data
const mockActivities = [
  {
    id: "1",
    type: "buy",
    creator: "Emma Davis",
    amount: "$245.00",
    tokens: "100",
    status: "completed",
    time: "2024-12-15T10:30:00Z",
    txHash: "0x1234...abcd",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "2",
    type: "sell",
    creator: "Jordan Lee",
    amount: "$156.00",
    tokens: "50",
    status: "completed",
    time: "2024-12-15T09:15:00Z",
    txHash: "0x5678...efgh",
    icon: Minus,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "3",
    type: "ipo",
    creator: "TechVision Studios",
    amount: "$1,000.00",
    tokens: "200",
    status: "pending",
    time: "2024-12-15T08:45:00Z",
    txHash: null,
    icon: Building,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "4",
    type: "buy",
    creator: "Priya Patel",
    amount: "$189.00",
    tokens: "75",
    status: "completed",
    time: "2024-12-14T16:20:00Z",
    txHash: "0x9abc...1234",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "5",
    type: "sell",
    creator: "Marcus Rodriguez",
    amount: "$116.75",
    tokens: "25",
    status: "failed",
    time: "2024-12-14T14:10:00Z",
    txHash: null,
    icon: Minus,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "6",
    type: "ipo",
    creator: "FitLife Academy",
    amount: "$500.00",
    tokens: "150",
    status: "processing",
    time: "2024-12-14T11:30:00Z",
    txHash: null,
    icon: Building,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "7",
    type: "buy",
    creator: "Sarah Johnson",
    amount: "$298.00",
    tokens: "100",
    status: "completed",
    time: "2024-12-13T13:45:00Z",
    txHash: "0xdef0...5678",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "8",
    type: "sell",
    creator: "David Kim",
    amount: "$450.00",
    tokens: "75",
    status: "completed",
    time: "2024-12-13T10:15:00Z",
    txHash: "0x9bcd...ef01",
    icon: Minus,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <ClockIcon className="h-4 w-4 text-yellow-600" />;
    case "processing":
      return <ClockIcon className="h-4 w-4 text-blue-600" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-700 bg-green-50";
    case "pending":
      return "text-yellow-700 bg-yellow-50";
    case "processing":
      return "text-blue-700 bg-blue-50";
    case "failed":
      return "text-red-700 bg-red-50";
    default:
      return "text-zinc-700 bg-zinc-50";
  }
};

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch = activity.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.amount.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    const matchesType = typeFilter === "all" || activity.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Activity
          </h1>
          <p className="text-zinc-500 mt-1">
            Track all your transactions and investment activity.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="ipo">IPO Investment</option>
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Total Transactions</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">156</p>
          <p className="text-sm text-green-600 mt-2">+12 this week</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Completed</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">142</p>
          <p className="text-sm text-green-600 mt-2">91% success rate</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Pending</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">8</p>
          <p className="text-sm text-yellow-600 mt-2">2 processing</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Volume (30d)</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">$12.4K</p>
          <p className="text-sm text-green-600 mt-2">+18.5% from last month</p>
        </div>
      </div>

      {/* Activity Table */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
          <h2 className="text-xl font-semibold text-zinc-900">Transaction History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Transaction
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Creator
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Tokens
                </th>
                <th className="text-center text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Time
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg ${activity.bgColor} flex items-center justify-center`}>
                        <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                      </div>
                      <span className="font-medium text-zinc-900 capitalize">{activity.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-zinc-900">{activity.creator}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-zinc-900">{activity.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-zinc-600">{activity.tokens}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                      <span className="capitalize">{activity.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-600">{formatTime(activity.time)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {activity.txHash && (
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        View TX
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500">No transactions found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}


