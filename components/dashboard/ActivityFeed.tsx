import React from "react";
import { ArrowUpRight, ArrowDownRight, Plus, Minus, Clock } from "lucide-react";

const mockActivities = [
  {
    id: "1",
    type: "buy",
    creator: "Emma Davis",
    amount: "$245.00",
    tokens: "100",
    time: "2 hours ago",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "2",
    type: "sell",
    creator: "Jordan Lee",
    amount: "$312.00",
    tokens: "50",
    time: "5 hours ago",
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
    time: "1 day ago",
    icon: ArrowUpRight,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "4",
    type: "buy",
    creator: "Priya Patel",
    amount: "$189.00",
    tokens: "75",
    time: "2 days ago",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export function ActivityFeed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-medium text-zinc-900">
            Recent Activity
          </h2>
          <p className="text-zinc-400 mt-1">
            Your latest transactions and investments.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h3 className="font-semibold text-zinc-900">Activity Feed</h3>
        </div>

        <div className="divide-y divide-zinc-100">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-6 hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-lg ${activity.bgColor} flex items-center justify-center`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-zinc-900">
                      {activity.type === "buy" && "Bought"}
                      {activity.type === "sell" && "Sold"}
                      {activity.type === "ipo" && "Invested in IPO"}{" "}
                      {activity.tokens} tokens from {activity.creator}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-zinc-500">{activity.amount}</p>
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>

                <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-100 p-4">
          <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
