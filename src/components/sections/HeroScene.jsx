"use client";

import { useState } from "react";

export default function HeroScene() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative w-full max-w-[560px]">
      <div className="absolute inset-x-[10%] top-[10%] h-[70%] rounded-full bg-[#EB5002]/10 blur-[90px]" aria-hidden="true" />

      <div className="relative aspect-[0.8] overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(235,80,2,0.18),transparent_34%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />

        {imageFailed ? (
          <div className="relative h-full w-full bg-[radial-gradient(circle_at_50%_18%,rgba(235,80,2,0.18),transparent_28%),linear-gradient(180deg,#0d0d0d_0%,#080808_100%)]">
            <div className="absolute inset-x-[10%] bottom-0 top-[10%] rounded-t-[42%] rounded-b-[6%] bg-[linear-gradient(180deg,#131313_0%,#090909_35%,#070707_100%)] shadow-[inset_0_0_36px_rgba(0,0,0,0.75)]" />
            <div className="absolute left-1/2 top-[13%] h-[30%] w-[23%] -translate-x-1/2 rounded-[46%] bg-[linear-gradient(180deg,#d8d0c5_0%,#b7afa6_100%)] shadow-[0_0_22px_rgba(235,80,2,0.12)]" />
            <div className="absolute left-1/2 top-[25%] h-[25%] w-[34%] -translate-x-1/2 rounded-[50%_50%_45%_45%] bg-[linear-gradient(180deg,#d8d0c5_0%,#b7afa6_100%)]" />
            <div className="absolute left-[27%] top-[23%] h-[10%] w-[6%] rounded-full bg-[#0b0b0b] opacity-70" />
            <div className="absolute right-[27%] top-[23%] h-[10%] w-[6%] rounded-full bg-[#0b0b0b] opacity-70" />
            <div className="absolute left-[42%] top-[35%] h-[4%] w-[16%] rounded-full bg-[#EB5002]/80" />
            <div className="absolute inset-x-[19%] bottom-[13%] h-[34%] rounded-[42%_42%_8%_8%] bg-[linear-gradient(180deg,#1a1a1a_0%,#090909_30%,#070707_100%)]" />
          </div>
        ) : (
          <img
            src="/images/profile/profile.webp"
            alt="Talha"
            className="h-full w-full object-cover object-center grayscale-[0.12] contrast-[1.16] brightness-[0.72]"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.46),rgba(0,0,0,0)_18%,rgba(0,0,0,0)_82%,rgba(0,0,0,0.42)),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.12)_54%,rgba(0,0,0,0.68)_100%)]" aria-hidden="true" />
        <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-[#EB5002]/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-[#EB5002]/18 to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}
