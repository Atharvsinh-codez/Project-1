"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  onSuccess?: () => void;
  variant?: "hero" | "default";
  showCounter?: boolean;
}

// Animated counter component that scrolls numbers up
function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 0);

      const updateTimer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 600);

      return () => {
        clearTimeout(timer);
        clearTimeout(updateTimer);
      };
    }
  }, [value, displayValue]);

  return (
    <div className="relative overflow-hidden h-10 flex items-center justify-center">
      <span
        className={`text-3xl font-extrabold bg-linear-to-r from-[#FF2F00] via-[#F2723B] to-[#FF6B35] bg-clip-text text-transparent transition-all duration-600 ease-out ${isAnimating
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
          }`}
      >
        {displayValue.toLocaleString()}
      </span>
      {isAnimating && (
        <span className="text-3xl font-extrabold bg-linear-to-r from-[#FF2F00] via-[#F2723B] to-[#FF6B35] bg-clip-text text-transparent absolute transition-all duration-600 ease-out translate-y-full opacity-0 animate-slide-up">
          {value.toLocaleString()}
        </span>
      )}
    </div>
  );
}

export default function WaitlistForm({
  onSuccess,
  variant = "default",
  showCounter = false,
}: WaitlistFormProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(showCounter);

  // OTP Logic States
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  // Fetch waitlist count
  useEffect(() => {
    if (!showCounter) return;
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
  }, [showCounter]);

  // Submit email directly (no OTP needed)
  const onRequestOtp = async (data: WaitlistFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      // Success - user is now on the waitlist
      if (result.alreadyVerified) {
        toast.info("You're already on the waitlist!");
      } else {
        toast.success("Welcome to the waitlist! 🎉");
      }

      reset({ email: "" });
      onSuccess?.();

      // Update count
      if (showCounter) {
        const countResponse = await fetch("/api/waitlist");
        if (countResponse.ok) {
          const countData = await countResponse.json();
          setCount(countData.count);
        }
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Failed to join. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const email = getValues("email");
      const response = await fetch("/api/waitlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Verification failed");
        return;
      }

      // Clear OTP immediately and reset form
      setOtp("");
      reset({ email: "" }); // Explicitly reset email to empty
      setStep("email"); // Reset to email step

      toast.success("Welcome to the waitlist!");
      onSuccess?.();

      // Update count
      if (showCounter) {
        const countResponse = await fetch("/api/waitlist");
        if (countResponse.ok) {
          const countData = await countResponse.json();
          setCount(countData.count);
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const commonInputStyles = `h-12 text-base transition-all duration-300 bg-white/90 backdrop-blur-sm border-zinc-200 focus:border-[#F2723B] focus:ring-[#F2723B]/20 hover:shadow-md focus:shadow-lg`;
  const commonButtonStyles = `h-12 px-8 bg-linear-to-r from-[#FF2F00] to-[#f5775b] hover:from-[#FF2F00] hover:to-[#FF2F00] text-white font-semibold text-base whitespace-nowrap transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:opacity-70`;

  if (variant === "hero") {
    return (
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full animate-fade-in relative">

          {/* STEP 1: EMAIL FORM */}
          {step === "email" ? (
            <form
              key="email-form"
              onSubmit={handleSubmit(onRequestOtp)}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <div className="flex-1 group">
                <Input
                  id="waitlist-email-input"
                  type="email"
                  placeholder="Enter your email"
                  style={{ scrollMarginTop: "40vh" }}
                  {...register("email")}
                  className={`${commonInputStyles} ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 text-center sm:text-left animate-fade-in">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isLoading} className={commonButtonStyles}>
                <span className="flex items-center gap-2">
                  {isLoading ? "Sending..." : "Join Waitlist"}
                  {!isLoading && (
                    <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </Button>
            </form>
          ) : (
            /* STEP 2: OTP FORM */
            <form
              key="otp-form"
              onSubmit={onVerifyOtp}
              className="flex flex-col sm:flex-row gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex-1 group relative">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
                  className={`${commonInputStyles} tracking-[0.5em] font-mono text-center placeholder:font-sans placeholder:tracking-normal placeholder:text-zinc-400`}
                  disabled={isLoading}
                  autoFocus
                />
                <p className="mt-2 text-xs text-zinc-500 text-center sm:text-left">
                  Sent to {getValues("email")} • <button type="button" onClick={() => setStep("email")} className="underline hover:text-[#FF2F00]">Change email</button>
                </p>
              </div>
              <Button type="submit" disabled={isLoading || otp.length < 6} className={commonButtonStyles}>
                <span className="flex items-center gap-2">
                  {isLoading ? "Verifying..." : "Verify & Join"}
                </span>
              </Button>
            </form>
          )}
        </div>

        {/* Counter Display */}
        {showCounter && !isLoadingCount && count !== null && (
          <div className="flex items-center gap-4 px-8 py-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-zinc-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
            <div className="relative">
              <AnimatedCounter value={count} />
              <div className="absolute inset-0 bg-linear-to-r from-[#FF2F00]/30 via-[#F2723B]/30 to-[#FF6B35]/30 blur-xl -z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>
            <div className="w-px h-8 bg-linear-to-b from-transparent via-zinc-300 to-transparent group-hover:via-[#F2723B] transition-colors duration-300"></div>
            <span className="text-zinc-700 font-semibold text-base animate-fade-in group-hover:text-zinc-900 transition-colors duration-300">
              {count === 1 ? "person" : "people"} joined
            </span>
            <div className="absolute top-2 right-2 w-1 h-1 bg-[#F2723B] rounded-full animate-ping opacity-40"></div>
          </div>
        )}
      </div>
    );
  }

  // Fallback "default" variant styling (simplified for brevity)
  return (
    <div className="w-full max-w-2xl mx-auto">
      {step === "email" ? (
        <form onSubmit={handleSubmit(onRequestOtp)} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter your email"
              {...register("email")}
              disabled={isLoading}
              className={`h-12 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} className={commonButtonStyles}>
            {isLoading ? "Sending..." : "Join Waitlist"}
          </Button>
        </form>
      ) : (
        <form onSubmit={onVerifyOtp} className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex-1">
            <Input
              placeholder="Enter code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 tracking-widest text-center"
              maxLength={6}
              disabled={isLoading}
              autoFocus
            />
            <p className="mt-2 text-xs text-zinc-500 text-center">Check your email for the code</p>
          </div>
          <Button type="submit" disabled={isLoading} className={commonButtonStyles}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      )}
    </div>
  );
}