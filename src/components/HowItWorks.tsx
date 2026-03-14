"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    nr: "01",
    title: "Wybierz lokal",
    desc: "Przejrzyj dostępne apartamenty, filtruj po metrażu, liczbie pokoi i piętrze. Sprawdź aktualny cennik i statusy.",
  },
  {
    nr: "02",
    title: "Umów prezentację",
    desc: "Skontaktuj się z nami telefonicznie lub mailowo. Pokażemy Ci budynek, omówimy szczegóły techniczne i harmonogram.",
  },
  {
    nr: "03",
    title: "Podpisz umowę deweloperską",
    desc: "Podpisujemy umowę deweloperską w formie aktu notarialnego. Pełna ochrona prawna zgodnie z ustawą deweloperską.",
  },
  {
    nr: "04",
    title: "Odbierz klucze",
    desc: "Po zakończeniu budowy przystępujemy do odbioru. Twój lokal jest gotowy – czas zacząć nowy rozdział.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = sectionRef.current?.querySelectorAll(".step-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
      ref={sectionRef}
      className="py-24 px-6 bg-brand-cream"
      aria-labelledby="jak-to-dziala-title"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
            Proces zakupu
          </p>
          <h2
            id="jak-to-dziala-title"
            className="font-display text-4xl md:text-5xl font-semibold text-brand-dark"
          >
            Jak to działa?
          </h2>
        </div>

        <div className="relative">
          {/* Linia pionowa */}
          <div
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-wood/20 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <div
                key={step.nr}
                className={`step-item relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Numer */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-brand-wood flex items-center justify-center shadow-md">
                  <span className="text-white font-display font-bold text-sm">
                    {step.nr}
                  </span>
                </div>

                {/* Treść */}
                <div
                  className={`flex-1 md:w-5/12 ${
                    i % 2 === 0
                      ? "md:pr-16 md:text-right ml-4 md:ml-0"
                      : "md:pl-16 md:ml-auto ml-4 md:ml-0"
                  }`}
                >
                  <h3 className="font-semibold text-brand-dark text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
