"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type AnimationData = Record<string, unknown>;

export function HeroLottie({ className }: { className?: string }) {
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/animations/HotelBooking.json")
      .then((response) => response.json())
      .then((data: AnimationData) => {
        if (active) setAnimationData(data);
      })
      .catch(() => {
        if (active) setAnimationData(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={className}>
      <div className="hero-lottie flex min-h-[240px] items-center justify-center px-2 py-4 md:min-h-[320px] md:justify-end md:px-0">
        {animationData ? (
          <Lottie animationData={animationData} loop autoplay className="w-full max-w-[430px] md:max-w-[500px]" />
        ) : (
          <div className="h-[180px] w-full max-w-[380px]" />
        )}
      </div>
    </div>
  );
}
