import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Token {
  id: string;
  creator: string;
  category: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  avatar: string;
}

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Creator
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Category
              </th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Price
              </th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                24h Change
              </th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Volume
              </th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Market Cap
              </th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {tokens.map((token) => (
              <tr key={token.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={token.avatar}
                      alt={token.creator}
                      className="h-8 w-8 rounded-full"
                      loading="lazy"
                    />
                    <span className="font-medium text-zinc-900">
                      {token.creator}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-500">
                    {token.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-zinc-900">
                    {token.price}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {token.changePercent.startsWith("+") ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`font-medium ${
                        token.changePercent.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {token.changePercent}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-zinc-600">{token.volume}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-zinc-600">
                    {token.marketCap}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors">
                      Buy
                    </button>
                    <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors">
                      Sell
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
