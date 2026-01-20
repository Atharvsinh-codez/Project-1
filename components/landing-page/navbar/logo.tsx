import { motion } from "motion/react";
import Link from "next/link";

const Logo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    className="flex gap-2 items-center"
  >
    <Link href="/">
      <img
        src="/images/logo/logo-icon.png"
        alt="Project-1 Logo"
        className="h-9 rounded-lg"
        loading="eager"
      />
    </Link>
  </motion.div>
);

export default Logo;
