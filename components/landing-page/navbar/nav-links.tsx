import { motion } from "motion/react";
import Link from "next/link";

const NAV_ITEMS = [
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

/* 1. Define Parent Variants (Entrance Animation) */
// We move the opacity/y logic here so the parent uses strings for states
const navItemVariants = {
  hidden: (isMobile: boolean) => ({
    opacity: isMobile ? 0 : 1,
    y: isMobile ? 10 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
};

/* 2. Define Child Variants (Underline Animation) */
const underlineVariants = {
  hidden: { width: 0 }, // mapped to parent's "hidden"
  visible: { width: 0 }, // mapped to parent's "visible"
  hover: { width: "100%" }, // mapped to parent's "hover"
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    className={`${
      isMobile ? "flex flex-col gap-5 items-center" : "flex gap-5 items-center"
    } font-semibold`}
  >
    {NAV_ITEMS.map((item, idx) => (
      <motion.div
        key={idx}
        className={`relative ${isMobile ? "group" : ""}`}
        // 3. Use the new variants here
        variants={navItemVariants}
        custom={isMobile} // Passes isMobile to the variant function
        initial="hidden"
        animate="visible"
        // 4. Because animate is now a string ("visible"),
        // whileHover="hover" will successfully stack on top and propagate.
        whileHover={!isMobile ? "hover" : undefined}
        transition={{ duration: 0.28, delay: isMobile ? 0.3 + idx * 0.06 : 0 }}
      >
        <Link href={item.link} className="block">
          <span className="text-white cursor-pointer">{item.title}</span>

          {/* Mobile CSS underline (unchanged) */}
          {isMobile && (
            <span className="absolute bottom-0 left-0 h-[2px] bg-white rounded-full w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
          )}
        </Link>

        {/* Desktop motion underline */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-white rounded-full"
            variants={underlineVariants}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            // Remove initial="default".
            // It will automatically inherit "hidden" -> "visible" from parent
          />
        )}
      </motion.div>
    ))}
  </div>
);

export default NavLinks;
