import React from "react";
import FeaturesHeader from "./features-header";
import FeatureCard from "./feature-card";
import MiniCardSection from "./mini-card-section";
import Tagline from "./tagline";

interface FeatureItem {
  title: string;
  desc: string;
  img: string;
  icon: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    title: "Sustainable Creator Capital",
    desc: "Creators raise upfront capital by issuing royalty-linked blockchain tokens, enabling long-term, transparent monetization without ads, sponsorship dependence, or equity dilution.",
    img: "/images/features/bitcoin.png",
    icon: "/images/features/earning.png",
  },
  {
    title: "Participation in Creator Growth",
    desc: "Supporters can acquire and hold creator-backed blockchain tokens that represent participation in a creator’s growth, with transparent pricing and on-chain settlement.",
    img: "/images/features/portfolio.png",
    icon: "/images/features/trading.png",
  },
  {
    title: "Initial Royalty Offering (IRO)",
    desc: "Creators launch royalty-backed blockchain tokens through a structured issuance process that defines valuation, supply, and release conditions before public access.",
    img: "/images/features/ipo.png",
    icon: "/images/features/rocket.png",
  },
  {
    title: "Bootstrapped Liquidity → Orderbook Markets",
    desc: "Early liquidity is provided through an automated bonding curve on-chain. Once maturity thresholds are met, tokens transition to an open orderbook-based market for price discovery.",
    img: "/images/features/tbc.png",
    icon: "/images/features/curve.png",
  },
];

const Features: React.FC = () => {
  return (
    <section className="px-2 sm:px-4 lg:px-6 w-full mt-10 sm:mt-16 lg:mt-20">
      <div className="h-fit w-full bg-[#0F0F0F] rounded-2xl sm:rounded-3xl lg:rounded-4xl px-4 sm:px-8 lg:px-12 xl:px-20">
        <FeaturesHeader />

        {/* Grid of Feature Cards */}
        <div className="border-4 sm:border-6 border-zinc-900 rounded-2xl sm:rounded-3xl lg:rounded-4xl grid grid-cols-1 lg:grid-cols-2 w-full mb-6 sm:mb-8 lg:mb-10 p-1 sm:p-2 gap-1 sm:gap-2">
          {FEATURES_DATA.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>

        {/* Center Showcase */}
        <Tagline />

        {/* Mini Feature Cards */}
        <MiniCardSection />
      </div>
    </section>
  );
};

export default Features;
