"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function LaunchConfetti() {
  const [dimensions, setDimensions] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [complete]);

  if (!dimensions || complete) return null;

  return (
    <Confetti
      {...dimensions}
      recycle={false}
      numberOfPieces={250}
      onConfettiComplete={() => setComplete(true)}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
