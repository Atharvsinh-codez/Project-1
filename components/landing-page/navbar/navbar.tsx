"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Logo from "./logo";
import BurgerButton from "./burger-button";
import NavLinks from "./nav-links";
import CTAButton from "./cta-button";
import MobileMenu from "./mobile-menu";
import GitHubStars from "./github-stars";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDelta, setScrollDelta] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollThreshold = 120;

  /* ---------------------------------------------
  HANDLE NAVBAR SHOW/HIDE ON SCROLL
  --------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY;

      const newDelta =
        Math.sign(scrollDelta) === Math.sign(diff) ? scrollDelta + diff : diff;

      setScrollDelta(newDelta);

      if (current < 50) {
        setIsVisible(true);
        setScrollDelta(0);
      } else if (newDelta > scrollThreshold && current > 150) {
        setIsVisible(false);
      } else if (newDelta < -50 || diff < 0) {
        setIsVisible(true);
        setScrollDelta(0);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollDelta]);

  /* ---------------------------------------------
  CLOSE MENU ON OUTSIDE CLICK
  --------------------------------------------- */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileMenuOpen]);

  return (
    <div className="mobile-menu-container fixed top-0 left-0 w-full h-[100px] flex items-center justify-center z-50">
      {/* Animated Navbar Shell */}
      <motion.div
        initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
        animate={{
          scaleX: isVisible ? 1 : 0,
          scaleY: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="border border-zinc-700 bg-black py-2 md:py-3 px-5 md:px-7 rounded-full flex justify-between w-[92%] md:w-auto md:gap-32 shadow-2xl shadow-zinc-800 origin-center"
      >
        <Logo />

        {/* Mobile Button */}
        <div className="md:hidden">
          <BurgerButton
            isOpen={isMobileMenuOpen}
            toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="hidden md:flex gap-6 items-center"
        >
          <NavLinks />
          <CTAButton />
          <GitHubStars />
        </motion.div>
      </motion.div>

      <MobileMenu isOpen={isMobileMenuOpen} />
    </div>
  );
};

export default Navbar;
