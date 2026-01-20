import CTAButton from "./cta-button";
import NavLinks from "./nav-links";
import { motion, AnimatePresence } from "motion/react";

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        style={{ transformOrigin: "top center" }}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.4,
        }}
        className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 max-w-[calc(100vw-2rem)] border border-zinc-700 rounded-3xl bg-black shadow-2xl shadow-zinc-800 overflow-hidden pointer-events-auto"
      >
        <div className="p-6 pb-8 flex flex-col items-center">
          {/* We pass isMobile to trigger the staggered link animations */}
          <NavLinks isMobile />
          <div className="mt-6 w-full">
            <CTAButton fullWidth />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu;
