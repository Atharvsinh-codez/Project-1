import React from "react";
import { Clock, TrendingUp } from "lucide-react";

interface CreatorCardProps {
  id: string;
  creator: string;
  name: string;
  description: string;
  progress: number;
  target: string;
  raised: string;
  daysLeft: number;
  category: string;
  avatar: string;
}

export function CreatorCard({
  creator,
  name,
  description,
  progress,
  target,
  raised,
  daysLeft,
  category,
  avatar,
}: CreatorCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-[#f9efe3] flex items-center justify-center text-zinc-900 font-semibold text-sm">
          {creator
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900">{name}</h3>
          <p className="text-sm text-zinc-500">by {creator}</p>
        </div>
        <span className="rounded-full bg-none border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600">
          {category}
        </span>
      </div>

      <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-zinc-900">{raised}</span>
          <span className="text-zinc-500">{target}</span>
        </div>
        <div className="w-full bg-zinc-200 rounded-full h-2">
          <div
            className="bg-[#F2723B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500 mt-1">{progress}% funded</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <Clock className="h-4 w-4" />
          <span>{daysLeft} days left</span>
        </div>
        <button className="rounded-lg bg-[#F2723B] px-4 py-2 text-sm font-medium text-white transition-colors">
          Participate
        </button>
      </div>
    </div>
  );
}
