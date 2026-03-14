"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const poi = [
  { icon: "🏫", name: "Centrum Środy Wlkp.", dist: "2 min jazdy" },
  { icon: "🛒", name: "Sklepy i usługi", dist: "w pobliżu" },
  { icon: "🏥", name: "Szpital powiatowy", dist: "5 min jazdy" },
  { icon: "🚆", name: "Stacja PKP", dist: "5 min jazdy" },
  { icon: "🛣️", name: "Droga S5 / Poznań", dist: "~30 km" },
  { icon: "✈️", name: "Lotnisko Ławica", dist: "~35 km" },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = sectionRef.current?.querySelectorAll(".gsap-reveal");
      els?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      const cards = sectionRef.current?.querySelectorAll(".poi-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="lokalizacja"
      ref={sectionRef}
      className="py-24 px-6 bg-white"
      aria-labelledby="lokalizacja-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="gsap-reveal text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
            Lokalizacja
          </p>
          <h2
            id="lokalizacja-title"
            className="gsap-reveal font-display text-4xl md:text-5xl font-semibold text-brand-dark mb-4"
          >
            ul. Topolska, Środa Wielkopolska
          </h2>
          <p className="gsap-reveal text-gray-500 text-lg leading-relaxed">
            Główna ulica wjazdowa do Środy Wlkp. – doskonała komunikacja,
            a jednocześnie kameralna, rozwijająca się okolica. Autostrada S5
            zapewnia szybki dojazd do Poznania.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Mapa */}
          <div className="gsap-reveal rounded-2xl overflow-hidden shadow-lg h-96 lg:h-[500px]">
            <MapComponent lat={52.2296} lng={17.2756} />
          </div>

          {/* POI grid */}
          <div className="gsap-reveal">
            <h3 className="font-semibold text-brand-dark text-lg mb-6">
              W pobliżu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {poi.map((item) => (
                <div
                  key={item.name}
                  className="poi-card flex items-center gap-4 bg-brand-cream rounded-xl p-4"
                >
                  <span
                    className="text-2xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-medium text-brand-dark text-sm">
                      {item.name}
                    </p>
                    <p className="text-brand-wood text-xs font-medium">
                      {item.dist}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-brand-dark text-white rounded-2xl">
              <p className="font-display font-semibold text-xl mb-1">
                30 minut od Poznania
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Droga ekspresowa S5 łączy Środę Wlkp. z centrum Poznania.
                Spokój małego miasta, dostęp do metropolii.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
