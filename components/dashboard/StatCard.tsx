import React from "react";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: StatCardProps) {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-zinc-500",
  };

  return (
    <div
      className={`rounded-3xl ${
        title !== "Portfolio Value" ? "bg-[#f9efe3]" : "bg-[#F2723B]"
      } p-5`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p
              className={`text-lg font-medium ${
                title === "Portfolio Value" ? "text-gray-200" : "text-zinc-900"
              }`}
            >
              {title}
            </p>
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <ArrowRight className="h-7 w-7 text-zinc-600 -rotate-45" />
            </div>
          </div>
          <p
            className={`text-[2.8rem] font-semibold ${
              title === "Portfolio Value" ? "text-white" : "text-zinc-900"
            } mt-3`}
          >
            {value}
          </p>
        </div>
      </div>
      <div className="mt-7">
        <p
          className={`text-sm font-medium ${
            title === "Portfolio Value" ? "text-[#f7e1c5]" : "text-[#F2723B]"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}
