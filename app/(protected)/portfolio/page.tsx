"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ChartContainer } from "@/components/dashboard/ChartContainer";

// Mock portfolio data
const mockHoldings = [
  {
    id: "1",
    creator: "Emma Davis",
    category: "Digital Art",
    tokens: 100,
    avgPrice: "$2.20",
    currentPrice: "$2.45",
    value: "$245.00",
    pnl: "+$25.00",
    pnlPercent: "+11.4%",
    pnlType: "positive" as const,
    avatar: "https://placehold.co/32x32?text=ED",
  },
  {
    id: "2",
    creator: "Jordan Lee",
    category: "Music Production",
    tokens: 50,
    avgPrice: "$2.85",
    currentPrice: "$3.12",
    value: "$156.00",
    pnl: "+$13.50",
    pnlPercent: "+9.5%",
    pnlType: "positive" as const,
    avatar: "https://placehold.co/32x32?text=JL",
  },
  {
    id: "3",
    creator: "Priya Patel",
    category: "Content Creation",
    tokens: 75,
    avgPrice: "$1.95",
    currentPrice: "$1.89",
    value: "$141.75",
    pnl: "-$4.50",
    pnlPercent: "-2.3%",
    pnlType: "negative" as const,
    avatar: "https://placehold.co/32x32?text=PP",
  },
  {
    id: "4",
    creator: "Marcus Rodriguez",
    category: "Gaming",
    tokens: 25,
    avgPrice: "$4.20",
    currentPrice: "$4.67",
    value: "$116.75",
    pnl: "+$11.75",
    pnlPercent: "+12.2%",
    pnlType: "positive" as const,
    avatar: "https://placehold.co/32x32?text=MR",
  },
];

const mockPortfolioHistory = [
  { date: "Jan", value: 9500 },
  { date: "Feb", value: 10200 },
  { date: "Mar", value: 9800 },
  { date: "Apr", value: 11500 },
  { date: "May", value: 12100 },
  { date: "Jun", value: 12450 },
];

export default function PortfolioPage() {
  const [timeRange, setTimeRange] = useState("1M");

  const totalValue = mockHoldings.reduce((sum, holding) => sum + parseFloat(holding.value.replace('$', '')), 0);
  const totalPnL = mockHoldings.reduce((sum, holding) => sum + parseFloat(holding.pnl.replace(/[+$]/g, '').replace('-', '-')), 0);
  const totalPnLPercent = ((totalPnL / (totalValue - totalPnL)) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Portfolio
          </h1>
          <p className="text-zinc-500 mt-1">
            Track your investments and performance.
          </p>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartContainer
          title="Total Portfolio Value"
          value={`$${totalValue.toFixed(2)}`}
          change={`${totalPnL >= 0 ? '+' : ''}$${totalPnL.toFixed(2)} (${totalPnLPercent}%)`}
          changeType={totalPnL >= 0 ? "positive" : "negative"}
        >
          {/* Placeholder chart */}
        </ChartContainer>

        <ChartContainer
          title="Today's Change"
          value="+2.4%"
          change="+1.2% from yesterday"
          changeType="positive"
        />

        <ChartContainer
          title="Best Performer"
          value="Marcus Rodriguez"
          change="+12.2% this month"
          changeType="positive"
        />
      </div>

      {/* Portfolio Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">Portfolio Performance</h2>
          <div className="flex gap-2">
            {["1W", "1M", "3M", "6M", "1Y", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeRange === range
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="h-64 bg-zinc-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-zinc-400">
            <TrendingUp className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">Portfolio Chart</p>
            <p className="text-sm">Interactive chart showing portfolio performance over time</p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
          <h2 className="text-xl font-semibold text-zinc-900">Your Holdings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Creator
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Tokens
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Avg Price
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Current Price
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Value
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  P&L
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockHoldings.map((holding) => (
                <tr key={holding.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={holding.avatar}
                        alt={holding.creator}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <span className="font-medium text-zinc-900">{holding.creator}</span>
                        <p className="text-xs text-zinc-500">{holding.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-zinc-900">{holding.tokens}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-zinc-600">{holding.avgPrice}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-zinc-900">{holding.currentPrice}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-zinc-900">{holding.value}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {holding.pnlType === "positive" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`font-medium ${holding.pnlType === "positive" ? "text-green-600" : "text-red-600"}`}>
                        {holding.pnlPercent}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors">
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Asset Allocation</h3>
          <div className="space-y-3">
            {mockHoldings.map((holding) => {
              const percentage = ((parseFloat(holding.value.replace('$', '')) / totalValue) * 100).toFixed(1);
              return (
                <div key={holding.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={holding.avatar}
                      alt={holding.creator}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-zinc-900">{holding.creator}</span>
                  </div>
                  <span className="text-sm text-zinc-600">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600">Total Invested</span>
              <span className="text-sm font-medium text-zinc-900">$1,089.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600">Current Value</span>
              <span className="text-sm font-medium text-zinc-900">${totalValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600">Total P&L</span>
              <span className={`text-sm font-medium ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-zinc-100 pt-3">
              <span className="text-sm font-medium text-zinc-900">Total Return</span>
              <span className={`text-sm font-medium ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalPnLPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


