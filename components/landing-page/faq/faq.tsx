"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";

const FAQ_ITEMS = [
  {
    id: "01",
    question: "How do creators earn money on Project-1?",
    answer:
      "Creators raise upfront capital by launching royalty-backed blockchain tokens through a structured Initial Royalty Offering (IRO). A portion of the proceeds is released to the creator, while the rest initializes on-chain liquidity. Over time, creators may also benefit from continued participation tied to activity around their token — all without ads, sponsorship dependence, or giving up ownership.",
  },
  {
    id: "02",
    question: "Do I need financial or crypto knowledge to participate?",
    answer:
      "Not at all. Project-1 abstracts away most of the complexity. Pricing and liquidity are handled automatically by smart contracts, so you don’t need to understand trading mechanics or market math. You simply choose creators you believe in and interact through a simple, guided interface.",
  },
  {
    id: "03",
    question: "How do buying and selling work?",
    answer:
      "During the early phase, tokens use an automated bonding curve that provides on-chain liquidity, meaning interactions happen instantly without waiting for a counterparty. Once a token reaches predefined maturity thresholds, it transitions to an orderbook-based market where prices are discovered through open participation.",
  },
  {
    id: "04",
    question: "What happens as a creator grows in popularity?",
    answer:
      "As a creator’s ecosystem grows, demand for their token may increase. During the bonding-curve phase, this demand is reflected algorithmically in pricing. After the transition to an orderbook market, price discovery is driven by open participation. This allows the system to reflect creator momentum in a transparent, market-based way.",
  },
  {
    id: "05",
    question: "How safe and transparent is the platform?",
    answer:
      "All issuance, pricing logic, and token flows are handled by audited smart contracts. Funds are held on-chain, and key actions are verifiable in real time. The system is designed to minimize manual intervention and provide clear, rule-based behavior for both creators and participants.",
  },
  {
    id: "06",
    question: "Can any creator launch a token?",
    answer:
      "Creators go through a verification and eligibility process before launching. This helps maintain quality, reduce misuse, and ensure that only active, credible creators can issue royalty-backed tokens. Once approved, creators can launch through a structured and standardized process.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full h-fit px-6 lg:px-8 xl:px-10 2xl:px-20 my-16 sm:my-20 lg:my-24 xl:my-32 2xl:my-40 overflow-x-hidden">
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-zinc-900 leading-tight">
          Got questions?
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>We've got answers.
        </h3>

        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 max-w-full lg:max-w-md text-left lg:text-right">
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 leading-relaxed">
            Here's everything you need to know before getting started.
          </p>

          <Link
            href="/contact"
            className="text-[#FF2F00] text-base sm:text-lg font-semibold flex gap-3 items-center justify-start lg:justify-end w-fit"
          >
            <span>Contact us</span>
            <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 -rotate-45 shrink-0" />
          </Link>
        </div>
      </div>

      {/* FAQ List */}
      <div className="mt-12 sm:mt-16 lg:mt-20 space-y-3 sm:space-y-4 lg:space-y-5 w-full">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = open === index;

          return (
            <div
              key={index}
              className="border border-orange-300 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all bg-white shadow-sm hover:shadow-md"
            >
              {/* Question Button */}
              <button
                className="w-full flex items-center justify-between cursor-pointer text-left"
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
                  {/* Number Badge */}
                  <span className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-medium text-xs sm:text-sm shrink-0">
                    {item.id}
                  </span>

                  <span className="text-base sm:text-lg lg:text-xl font-medium text-zinc-900 leading-tight pr-2">
                    {item.question}
                  </span>
                </div>

                {/* Plus / Minus Icon with animation */}
                <motion.span
                  key={isOpen ? "minus" : "plus"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#FF2F00] text-xl sm:text-2xl lg:text-3xl leading-none select-none shrink-0 ml-2"
                >
                  {isOpen ? "−" : "+"}
                </motion.span>
              </button>

              {/* Answer with smooth animation */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed pb-2 sm:pb-3 pl-11 sm:pl-13 lg:pl-15">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
