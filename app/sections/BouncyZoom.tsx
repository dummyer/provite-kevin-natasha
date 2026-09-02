// app/sections/BouncyZoom.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BouncyZoomProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function BouncyZoom({
  children,
  className = "",
  delay = 0,
}: BouncyZoomProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 15,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}