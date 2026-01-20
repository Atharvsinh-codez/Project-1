import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChartContainerProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  children?: React.ReactNode;
}

export function ChartContainer({ title, value, change, changeType, children }: ChartContainerProps) {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-zinc-500",
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        <div className="flex items-center gap-1">
          {changeType === "positive" ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : changeType === "negative" ? (
            <TrendingDown className="h-4 w-4 text-red-600" />
          ) : null}
          <span className={`text-sm font-medium ${changeColor[changeType]}`}>
            {change}
          </span>
        </div>
      </div>

      <div className="text-3xl font-bold text-zinc-900 mb-4">{value}</div>

      {children && (
        <div className="h-32 flex items-center justify-center bg-zinc-50 rounded-lg">
          {/* Placeholder for chart - would integrate with a charting library like recharts */}
          <div className="text-center text-zinc-400">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Chart visualization</p>
            <p className="text-xs">Integration with charting library needed</p>
          </div>
        </div>
      )}
    </div>
  );
}


