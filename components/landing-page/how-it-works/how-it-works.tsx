"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const STEPS = [
  {
    title: "Initial Royalty Offering (IRO)",
    icon: "/images/howitworks/rocket.png",
    step_image: "/images/howitworks/step1.png",
    description:
      "Creators begin by launching a royalty-backed blockchain token through a structured Initial Royalty Offering (IRO). Early participants acquire the first tokens at a predefined price. A portion of the proceeds is released to the creator as upfront capital, while the remainder is locked into a reserve that initializes on-chain liquidity.",
  },
  {
    title: "Bonding Curve Liquidity Phase",
    icon: "/images/howitworks/tbc.png",
    step_image: "/images/howitworks/step2.jpeg",
    description:
      "After the IRO, the token enters a bonding-curve phase that provides automated, on-chain liquidity. Token prices adjust algorithmically based on supply and demand, with buys minting tokens and sells burning them. This phase ensures continuous liquidity without relying on external market makers.",
  },
  {
    title: "Orderbook Market Transition",
    icon: "/images/howitworks/trading.png",
    step_image: "/images/howitworks/step3.jpeg",
    description:
      "Once predefined maturity thresholds are reached, the token transitions from the bonding curve to an open orderbook market. At this stage, participants can trade freely with market-driven price discovery, while creators benefit from long-term participation tied to their ecosystem’s growth.",
  },
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setCurrentStep((prev) => (prev + 1) % STEPS.length),
      7000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <section className="w-full my-16 sm:my-20 lg:my-24 xl:my-32 px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col lg:flex-row h-fit gap-8 lg:gap-0 items-stretch">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[47%] p-6 sm:p-8 lg:p-12 flex flex-col gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-zinc-900 font-medium leading-tight">
          <span className="text-zinc-600">So… How Does This Whole Thing </span>
          Actually Work?
        </h3>

        <p className="text-zinc-500 text-base sm:text-lg font-semibold leading-relaxed">
          Yes, it's fully on-chain, yes, liquidity is instant, and no, you don't
          have to understand bonding curves to use it like an absolute pro.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 pr-0 lg:pr-10 relative">
          {STEPS.map((step, index) => {
            const isActive = currentStep === index;

            return (
              <div
                key={index}
                className="px-4 sm:px-5 lg:px-7 py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl flex gap-3 sm:gap-4 lg:gap-5 items-center relative overflow-hidden"
              >
                {/* Base highlight */}
                <motion.div
                  layoutId="highlight"
                  className={`absolute inset-0 ${
                    isActive ? "bg-orange-200" : "bg-zinc-400/10"
                  }  rounded-lg sm:rounded-xl -z-10`}
                  transition={{ type: "spring", stiffness: 250, damping: 28 }}
                />

                {/* Overlay progress fill */}
                {isActive && (
                  <motion.div
                    key={currentStep}
                    className="absolute inset-0 bg-orange-400/70 -z-10 rounded-lg sm:rounded-xl origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}

                <img
                  src={step.icon}
                  className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0"
                  alt={step.title}
                  loading="lazy"
                />
                <span className="text-zinc-900 font-semibold text-sm sm:text-base lg:text-lg">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[53%] rounded-2xl sm:rounded-3xl lg:rounded-4xl relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden">
          <img
            src="/images/howitworks/bg.png"
            className="w-full h-full object-cover"
            alt="How It Works Background"
            loading="lazy"
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col p-6 sm:p-8 lg:p-12">
          {/* Step Image - Centered with flex */}
          <div className="flex-1 flex items-center justify-center min-h-0 mb-10">
            <motion.img
              key={STEPS[currentStep].step_image}
              src={STEPS[currentStep].step_image}
              className="max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] xl:max-h-[350px] w-auto rounded-lg sm:rounded-xl shadow-2xl shadow-zinc-200/60"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45 }}
              alt={STEPS[currentStep].title}
              loading="lazy"
            />
          </div>

          {/* Description - Bottom */}
          <motion.div
            key={STEPS[currentStep].description}
            className="shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-white/80 font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
              {STEPS[currentStep].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
