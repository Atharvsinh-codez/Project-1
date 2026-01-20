"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
  text: string;
}

const HeroText = ({ text }: HeroTextProps) => {
  const words = text.split(" ");
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!heroTextRef.current) return;

    gsap.to(heroTextRef.current, {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: "top 20%",
        end: "top -10%",
        scrub: 2,
        pin: true,
      },
    });
  });

  return (
    <h1
      ref={heroTextRef}
      className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl max-sm:px-2 max-w-4xl text-center font-bold flex flex-wrap justify-center content-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

export default HeroText;
