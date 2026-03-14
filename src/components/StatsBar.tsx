"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "countup.js";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: "", label: "lokale w budynku", prefix: "" },
  { value: 100, suffix: " m²", label: "maks. powierzchnia", prefix: "do " },
  { value: 30, suffix: " km", label: "od Poznania", prefix: "" },
  { value: 2026, suffix: "", label: "rok oddania", prefix: "" },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Reveal sekcji
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // CountUp dla każdego licznika
      stats.forEach((stat, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const cu = new CountUp(el, stat.value, {
          duration: 2,
          separator: " ",
          suffix: stat.suffix,
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => cu.start(),
          once: true,
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-dark text-white py-12 px-6"
      aria-label="Kluczowe parametry inwestycji"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <div className="flex items-baseline gap-0.5">
              {stat.prefix && (
                <span className="text-brand-wood text-2xl font-light">
                  {stat.prefix}
                </span>
              )}
              <span
                ref={(el) => {
                  if (el) itemRefs.current[i] = el;
                }}
                className="text-4xl font-display font-semibold text-brand-wood"
                aria-label={`${stat.value}${stat.suffix}`}
              >
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-brand-wood text-2xl font-light">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
