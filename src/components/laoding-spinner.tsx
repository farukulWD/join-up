"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({
  size = 24,
  className,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", className)}
      size={size}
      strokeWidth={2.5}
      role="status"
    />
  );
}
LoadingSpinner.displayName = "LoadingSpinner";