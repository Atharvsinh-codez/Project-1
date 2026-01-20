"use client";

import HeroLogos from "./hero-logos";
import { motion } from "motion/react";
import HeroText from "./hero-text";
import Link from "next/link";
import WaitlistForm from "../waitlist/waitlist-form";

const SOCIALS = [
  {
    title: "Twitter",
    icon: "/images/socials/twitter.png",
    link: "https://x.com/athrix_codes",
  },
  {
    title: "GitHub",
    icon: "/images/socials/github.png",
    link: "https://github.com/Atharvsinh-codez/Project-1",
  },
];

const Hero = () => {
  return (
    <section className="relative h-fit w-full">
      {/* HERO TOP - Background + Floating Logos */}
      <div className="hero relative h-dvh w-full overflow-hidden">
        {/* Background image */}
        <img
          className="masked-img"
          src="/images/hero/hero-image.jpg"
          alt="Hero Background"
          loading="eager"
        />

        {/* Mask/Overlay */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Floating platform logos */}
        <HeroLogos />
      </div>

      {/* HERO CONTENT BELOW */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-32 md:pt-60 gap-16 md:gap-40">
        <HeroText text="Creators Aren't Content, They're Assets" />

        {/* Dashboard Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 1.5,
            },
            opacity: {
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
            },
          }}
          className="relative"
        >
          <img
            src="/images/hero/dashboard.png"
            alt="Dashboard Interface"
            className="h-[250px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-xl relative z-10"
            loading="eager"
          />

          {/* Glow after reveal */}
          <motion.div
            className="absolute inset-0 rounded-4xl pointer-events-none"
            style={{
              boxShadow: "1px -10px 80px -10px #f8532e",
              opacity: 0,
            }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center my-30 gap-10">
        <h2 className="font-medium text-lg sm:text-2xl text-center">
          You've been investing in creators emotionally.
          <br /> Try financially.
        </h2>
        <div className="w-full max-w-2xl px-5">
          <WaitlistForm variant="hero" showCounter={true} />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex">
            {SOCIALS.map((social, index) => {
              // Use deterministic rotation based on index to avoid hydration mismatch
              const rotations = [-5, 3, -4]; // Pre-defined rotations for each social
              const rotation = rotations[index % rotations.length];

              return (
                <Link key={index} href={social.link}>
                  <div
                    className="p-3 border border-zinc-300 bg-white shadow-zinc-500 rounded-xl hover:-translate-y-2 duration-300 transition-all"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <img
                      src={social.icon}
                      alt={social.title}
                      className="h-7 w-7"
                      loading="lazy"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="text-zinc-700 font-medium text-sm sm:text-base">
            Follow us on these platforms
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
