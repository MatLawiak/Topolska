"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Kiedy planowane jest zakończenie budowy?",
    a: "Planowany termin oddania inwestycji to 2026 rok. Szczegółowy harmonogram harmonogram jest dostępny w prospekcie informacyjnym.",
  },
  {
    q: "Czy lokale parterowe można przeznaczyć na działalność usługową lub biurową?",
    a: "Tak. Lokale parterowe (~70 m²) zostały zaprojektowane z myślą o elastycznym przeznaczeniu – mogą służyć zarówno jako mieszkania, jak i lokale usługowe lub biurowe. Garaż w bryle budynku stanowi dodatkowy atut.",
  },
  {
    q: "Co to jest dach tarasowy i czy jest dostępny dla obu lokali na I piętrze?",
    a: "Dach tarasowy to przestronny taras na dachu budynku, dostępny dla lokatorów I piętra. To unikatowe rozwiązanie w Środzie Wlkp., oferujące panoramiczne widoki i dodatkową przestrzeń do relaksu na świeżym powietrzu.",
  },
  {
    q: "Na jakiej podstawie prawnej odbywa się zakup?",
    a: "Zakup lokalu odbywa się na podstawie umowy deweloperskiej w formie aktu notarialnego, zgodnie z ustawą deweloperską z dnia 16 września 2011 r. Prospekt informacyjny dostępny jest na życzenie.",
  },
  {
    q: "Czy możliwe jest finansowanie kredytem hipotecznym?",
    a: "Oczywiście. Lokale kwalifikują się do finansowania kredytem hipotecznym. Chętnie wskażemy sprawdzonych doradców kredytowych w okolicy.",
  },
  {
    q: "Jak wygląda kwestia miejsc parkingowych?",
    a: "Lokale parterowe posiadają garaż w bryle budynku. Przed budynkiem dostępne są również miejsca postojowe na terenie inwestycji.",
  },
  {
    q: "Jaka jest odległość od centrum Poznania?",
    a: "Środa Wielkopolska znajduje się około 30 km od Poznania. Droga ekspresowa S5 zapewnia szybki dojazd – zazwyczaj ok. 30 minut bez korków.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between text-left py-5 gap-4 focus-visible:outline-none focus-visible:text-brand-wood"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium text-brand-dark pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-brand-wood"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 4v12M4 10h12" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
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
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 px-6 bg-white"
      aria-labelledby="faq-title"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="gsap-reveal text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
            FAQ
          </p>
          <h2
            id="faq-title"
            className="gsap-reveal font-display text-4xl md:text-5xl font-semibold text-brand-dark"
          >
            Najczęstsze pytania
          </h2>
        </div>

        <div className="gsap-reveal">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="gsap-reveal mt-12 text-center p-8 bg-brand-cream rounded-2xl">
          <p className="text-gray-600 mb-4">
            Nie znalazłeś odpowiedzi na swoje pytanie?
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-brand-wood text-white font-medium px-6 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            Napisz do nas
          </a>
        </div>
      </div>
    </section>
  );
}
