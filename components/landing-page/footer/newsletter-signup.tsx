"use client";

import { useState } from "react";
import { FaArrowTurnDown } from "react-icons/fa6";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full h-10 sm:h-11 lg:h-12 xl:h-[50px] bg-[#121111cb] rounded-lg sm:rounded-xl border border-zinc-700 flex justify-between p-[2px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@gmail.com"
          className="w-full px-3 sm:px-4 lg:px-5 focus:outline-none text-sm sm:text-base bg-transparent text-white placeholder-zinc-400"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-fit px-4 sm:px-5 lg:px-6 xl:px-7 py-1.5 sm:py-2 bg-[#292929] hover:bg-[#3a3a3a] rounded-lg sm:rounded-xl flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5 items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowTurnDown className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 rotate-90" />
          <span className="text-xs sm:text-sm lg:text-base">
            {isLoading ? "..." : "Subscribe"}
          </span>
        </button>
      </div>
    </form>
  );
}
