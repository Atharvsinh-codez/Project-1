"use client";

import { motion } from "motion/react";

interface FloatingLogoProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  animateY?: number;
  animateX?: number;
  rotate?: number;
  duration?: number;
  initialShadow?: string;
  deepShadow?: string;
}

const FloatingLogo = ({
  src,
  alt,
  className,
  style,
  animateY = 30,
  animateX = 10,
  rotate = 10,
  duration = 5,
  initialShadow,
  deepShadow,
}: FloatingLogoProps) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={style}
      initial={{
        rotate: -rotate,
        rotateX: 15,
        rotateY: -10,
        filter: initialShadow,
      }}
      animate={{
        y: [0, -animateY, 0],
        x: [0, animateX, 0],
        rotate: [-rotate, -(rotate + 10), -rotate],
        filter: [initialShadow!, deepShadow!, initialShadow!],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default FloatingLogo;
