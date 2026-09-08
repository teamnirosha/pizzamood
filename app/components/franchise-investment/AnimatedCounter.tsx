"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  targetAmount: number;
  prefix?: string;
  duration?: number;
  shouldStart?: boolean;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetAmount,
  prefix = "₹ ",
  duration = 2000,
  shouldStart = true,
  className = "",
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const startTimestampRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) {
      setCurrentValue(0);
      return;
    }

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentValue(targetAmount);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimestampRef.current) startTimestampRef.current = timestamp;
      const elapsed = timestamp - startTimestampRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeOutExpo * targetAmount);

      setCurrentValue(val);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetAmount);
      }
    };

    startTimestampRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetAmount, duration, shouldStart]);

  const formatIndianCurrency = (val: number) => {
    return prefix + val.toLocaleString("en-IN");
  };

  return <span className={className}>{formatIndianCurrency(currentValue)}</span>;
};
