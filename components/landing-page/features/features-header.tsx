import React from "react";

const FeaturesHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20 xl:py-32 px-5">
      <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium max-w-full lg:max-w-[700px] leading-tight">
        A market where creators rise—and your wallet doesn't get left behind.
      </h3>

      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 max-w-full lg:max-w-[600px]">
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          We’re building a decentralized platform where creators issue
          royalty-linked blockchain tokens with built-in initial liquidity.
          These tokens later transition to open market trading, enabling
          community participation in creator growth and sustainable
          monetization.
        </p>

        <button
          type="button"
          className="w-fit bg-linear-to-t from-zinc-900 to-zinc-700 border border-t-zinc-500 hover:from-zinc-900 hover:to-zinc-800 border-zinc-700 font-semibold text-white px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base"
        >
          Let's Dive In
        </button>
      </div>
    </div>
  );
};

export default FeaturesHeader;
