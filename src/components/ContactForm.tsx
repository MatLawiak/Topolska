"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  imie: string;
  email: string;
  telefon: string;
  lokal: string;
  wiadomosc: string;
  rodo: boolean;
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

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

  const onSubmit = async (data: FormData) => {
    // Symulacja wysyłki — podłącz własne API lub Formspree
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Formularz:", data);
    setSent(true);
    reset();
  };

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="py-24 px-6 bg-brand-dark text-white"
      aria-labelledby="kontakt-title"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Lewa kolumna */}
        <div>
          <p className="gsap-reveal text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
            Kontakt
          </p>
          <h2
            id="kontakt-title"
            className="gsap-reveal font-display text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight"
          >
            Zainteresowany?
            <br />
            <span className="text-brand-wood">Napisz do nas.</span>
          </h2>
          <p className="gsap-reveal text-white/60 text-lg leading-relaxed mb-10">
            Odpiszemy w ciągu 24 godzin. Możemy też umówić prezentację
            budynku w dogodnym terminie.
          </p>

          <div className="gsap-reveal space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-wood/20 flex items-center justify-center text-brand-wood flex-shrink-0">
                📍
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Lokalizacja
                </p>
                <p className="text-white font-medium">
                  ul. Topolska, 63-000 Środa Wlkp.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-wood/20 flex items-center justify-center text-brand-wood flex-shrink-0">
                📞
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Telefon
                </p>
                <a
                  href="tel:+48"
                  className="text-white font-medium hover:text-brand-wood transition-colors"
                >
                  [do uzupełnienia]
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-wood/20 flex items-center justify-center text-brand-wood flex-shrink-0">
                ✉️
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  E-mail
                </p>
                <a
                  href="mailto:kontakt@topolska-residence.pl"
                  className="text-white font-medium hover:text-brand-wood transition-colors"
                >
                  kontakt@topolska-residence.pl
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Formularz */}
        <div className="gsap-reveal">
          {sent ? (
            <div className="bg-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Wiadomość wysłana!
              </h3>
              <p className="text-white/60">
                Odezwiemy się w ciągu 24 godzin.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-brand-wood hover:text-white text-sm underline"
              >
                Wyślij kolejną wiadomość
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="imie"
                    className="block text-white/70 text-sm mb-1.5"
                  >
                    Imię i nazwisko <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="imie"
                    type="text"
                    placeholder="Jan Kowalski"
                    className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-wood transition-colors ${
                      errors.imie
                        ? "border-red-400"
                        : "border-white/20 focus:border-brand-wood"
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.imie}
                    {...register("imie", {
                      required: "Podaj imię i nazwisko",
                    })}
                  />
                  {errors.imie && (
                    <p className="text-red-400 text-xs mt-1" role="alert">
                      {errors.imie.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/70 text-sm mb-1.5"
                  >
                    E-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jan@example.com"
                    className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-400"
                        : "border-white/20 focus:border-brand-wood"
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    {...register("email", {
                      required: "Podaj adres e-mail",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Nieprawidłowy adres e-mail",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="telefon"
                    className="block text-white/70 text-sm mb-1.5"
                  >
                    Telefon
                  </label>
                  <input
                    id="telefon"
                    type="tel"
                    placeholder="+48 500 000 000"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-wood transition-colors"
                    {...register("telefon")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lokal"
                    className="block text-white/70 text-sm mb-1.5"
                  >
                    Interesuje mnie
                  </label>
                  <select
                    id="lokal"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-wood transition-colors"
                    {...register("lokal")}
                  >
                    <option value="" className="bg-brand-dark">
                      Wybierz lokal
                    </option>
                    <option value="L01" className="bg-brand-dark">
                      Lokal 01 – Parter, 70 m²
                    </option>
                    <option value="L02" className="bg-brand-dark">
                      Lokal 02 – Parter, 70 m²
                    </option>
                    <option value="L03" className="bg-brand-dark">
                      Lokal 03 – I piętro, 100 m²
                    </option>
                    <option value="L04" className="bg-brand-dark">
                      Lokal 04 – I piętro, 100 m²
                    </option>
                    <option value="inne" className="bg-brand-dark">
                      Inne / nie wiem jeszcze
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="wiadomosc"
                  className="block text-white/70 text-sm mb-1.5"
                >
                  Wiadomość
                </label>
                <textarea
                  id="wiadomosc"
                  rows={4}
                  placeholder="Napisz, czego szukasz lub zadaj pytanie..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-wood transition-colors resize-none"
                  {...register("wiadomosc")}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="rodo"
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-brand-wood flex-shrink-0"
                  aria-required="true"
                  {...register("rodo", {
                    required: "Zgoda na przetwarzanie danych jest wymagana",
                  })}
                />
                <label
                  htmlFor="rodo"
                  className="text-white/50 text-xs leading-relaxed"
                >
                  Wyrażam zgodę na przetwarzanie moich danych osobowych
                  w celu obsługi zapytania, zgodnie z{" "}
                  <a
                    href="/polityka-prywatnosci/"
                    className="text-brand-wood hover:text-white underline"
                  >
                    Polityką prywatności
                  </a>
                  . <span aria-hidden="true">*</span>
                </label>
              </div>
              {errors.rodo && (
                <p className="text-red-400 text-xs" role="alert">
                  {errors.rodo.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-wood text-white font-medium py-4 rounded-full hover:bg-white hover:text-brand-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
