"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax tło
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Reveal treści
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll(".hero-el");
        gsap.fromTo(
          els,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Baner główny"
    >
      {/* Tło z parallax */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero.png"
          alt="Topolska Residence – wizualizacja budynku"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Treść */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <p className="hero-el text-brand-wood text-sm font-medium tracking-[0.3em] uppercase mb-4">
          Środa Wielkopolska · 30 km od Poznania
        </p>
        <h1 className="hero-el font-display text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
          Topolska
          <br />
          <em className="not-italic text-brand-wood">Residence</em>
        </h1>
        <p className="hero-el text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
          Twój dom premium. Kameralna inwestycja z garażami
          i wyjątkowym dachem tarasowym.
        </p>
        <div className="hero-el flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#apartamenty"
            className="inline-flex items-center justify-center gap-2 bg-brand-wood text-white font-medium px-8 py-4 rounded-full hover:bg-white hover:text-brand-dark transition-colors duration-300 text-sm tracking-wide"
          >
            Sprawdź dostępność
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#o-inwestycji"
            className="inline-flex items-center justify-center gap-2 border border-white/60 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300 text-sm tracking-wide"
          >
            Dowiedz się więcej
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Przewiń</span>
        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
