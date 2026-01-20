"use client";

import { useState, useEffect } from "react";
import WaitlistForm from "./waitlist-form";

export default function Waitlist() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  // Fetch waitlist count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/waitlist");
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchCount();
  }, []);

  const handleSuccess = async () => {
    // Update count after successful submission
    const countResponse = await fetch("/api/waitlist");
    if (countResponse.ok) {
      const countData = await countResponse.json();
      setCount(countData.count);
    }
  };

  return (
    <section
      id="waitlist"
      className="w-full py-20 px-5 md:px-20 bg-gradient-to-b from-[#F9EFE3] to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            Join the Waitlist
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 mb-8">
            Be among the first to experience the future of creator assets
          </p>
          {!isLoadingCount && count !== null && (
            <div className="inline-flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-br from-white to-zinc-50 rounded-2xl shadow-lg border-2 border-zinc-200/50 backdrop-blur-sm relative overflow-hidden group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F2723B]/10 via-[#FF2F00]/5 to-[#F2723B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-[#F2723B]/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#FF2F00]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FF2F00] to-[#F2723B] bg-clip-text text-transparent">
                    {count.toLocaleString()}
                  </span>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />
                <span className="text-zinc-700 font-semibold text-lg md:text-xl">
                  {count === 1 ? "person" : "people"} already joined
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          )}
        </div>

        <WaitlistForm onSuccess={handleSuccess} />
      </div>
    </section>
  );
}
