"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";

import type React from "react";

interface AnimatedButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  whileHover?: any;
  whileTap?: any;
}

export default function AnimatedButton({
  children,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  ...props
}: AnimatedButtonProps & VariantProps<typeof Button>) {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ duration: 0.2 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
