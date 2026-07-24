"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroVideoProps = {
  className?: string;
};

/**
 * Full-bleed cinematic hero background.
 * Muted autoplay loop with poster fallback and reduced-motion support.
 */
export function HeroVideo({ className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [src, setSrc] = useState("/video/hero-720.mp4");

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWide = window.matchMedia("(min-width: 1280px)");

    const sync = () => {
      setReducedMotion(mqMotion.matches);
      setSrc(mqWide.matches ? "/video/hero.mp4" : "/video/hero-720.mp4");
    };

    sync();
    mqMotion.addEventListener("change", sync);
    mqWide.addEventListener("change", sync);
    return () => {
      mqMotion.removeEventListener("change", sync);
      mqWide.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    setReady(false);
    video.load();

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Autoplay blocked — poster remains visible
      }
    };

    tryPlay();
  }, [reducedMotion, src]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-brand-navy", className)}>
      <Image
        src="/video/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover object-center transition-opacity duration-700",
          ready && !reducedMotion ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      />

      {!reducedMotion ? (
        <video
          ref={videoRef}
          key={src}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0"
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {/* Light overlays only — keep the reel visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/35 via-transparent to-brand-navy/70" />
    </div>
  );
}
