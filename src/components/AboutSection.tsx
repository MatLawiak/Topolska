"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  { src: "/images/entrance.png", alt: "Główne wejście do lokali" },
  { src: "/images/front-22.png", alt: "Elewacja frontowa" },
  { src: "/images/night.png", alt: "Widok nocny z podświetleniem" },
  { src: "/images/garden.png", alt: "Ogród i taras" },
  { src: "/images/rear.jpg", alt: "Widok od strony ogrodu" },
];

const usp = [
  {
    icon: "🏠",
    title: "Kameralność",
    desc: "Zaledwie 4 lokale – prywatność i spokój bez wielkomiejskiego zgiełku.",
  },
  {
    icon: "🚗",
    title: "Garaż w bryle",
    desc: "Parter: komfortowy garaż wbudowany w budynek – zawsze pod ręką.",
  },
  {
    icon: "🌿",
    title: "Dach tarasowy",
    desc: "Unikat w okolicy. Przestronny taras na dachu – idealne miejsce do wypoczynku.",
  },
  {
    icon: "📍",
    title: "30 km od Poznania",
    desc: "Wygoda Poznania, spokój małego miasta. Szybki dojazd S5 i drogą ekspresową.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [lightgalleryLoaded, setLightgalleryLoaded] =
    useRef(false) as unknown as [boolean, (v: boolean) => void];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const revealEls = sectionRef.current?.querySelectorAll(".gsap-reveal");
      revealEls?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Stagger na kartach USP
      const cards = cardsRef.current?.querySelectorAll(".usp-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    });

    // Dynamicznie ładuj lightgallery
    import("lightgallery").then((lg) => {
      const container = document.getElementById("lg-gallery");
      if (container && !lightgalleryLoaded) {
        lg.default(container, {
          plugins: [],
          selector: "a",
          speed: 500,
          backdropDuration: 300,
        });
        setLightgalleryLoaded(true);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="o-inwestycji"
      ref={sectionRef}
      className="py-24 px-6 bg-brand-light"
      aria-labelledby="o-inwestycji-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek */}
        <div className="max-w-2xl mb-16">
          <p className="gsap-reveal text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
            O inwestycji
          </p>
          <h2
            id="o-inwestycji-title"
            ref={titleRef}
            className="gsap-reveal font-display text-4xl md:text-5xl font-semibold text-brand-dark leading-tight mb-6"
          >
            Nowoczesność w kameralnym wydaniu
          </h2>
          <p className="gsap-reveal text-gray-600 text-lg leading-relaxed">
            Topolska Residence to 4-lokalowy budynek mieszkalny przy głównej
            ulicy wjazdowej do Środy Wielkopolskiej. Nowoczesna architektura
            z elementami drewna i kamienia, garaże w bryle budynku oraz
            ekskluzywny dach tarasowy – unikat w tej okolicy. Zaledwie 30 km
            od Poznania, idealny dla tych, którzy cenią spokój bez rezygnowania
            z miejskich udogodnień.
          </p>
        </div>

        {/* Galeria */}
        <div
          id="lg-gallery"
          className="gsap-reveal grid grid-cols-2 md:grid-cols-3 gap-3 mb-20"
          aria-label="Galeria wizualizacji"
        >
          {gallery.map((img, i) => (
            <a
              key={img.src}
              href={img.src}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "col-span-2 md:col-span-2 row-span-1" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
              aria-label={`Powiększ zdjęcie: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* USP grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {usp.map((item) => (
            <div
              key={item.title}
              className="usp-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="font-semibold text-brand-dark text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
