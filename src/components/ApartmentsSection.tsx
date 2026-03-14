"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Lokal {
  id: string;
  nr: string;
  pietro: string;
  metraz: number;
  pokoje: number;
  garaz: boolean;
  taras_dachowy: boolean;
  cena_m2: number;
  cena_total: number;
  status: "Dostępny" | "Rezerwacja" | "Sprzedany";
  opis: string;
}

const statusColor: Record<string, string> = {
  Dostępny: "bg-emerald-100 text-emerald-700",
  Rezerwacja: "bg-amber-100 text-amber-700",
  Sprzedany: "bg-red-100 text-red-600",
};

export default function ApartmentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lokale, setLokale] = useState<Lokal[]>([]);
  const [filterPietro, setFilterPietro] = useState("wszystkie");
  const [filterStatus, setFilterStatus] = useState("wszystkie");
  const [selected, setSelected] = useState<Lokal | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setLokale(d.lokale));
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  const filtered = lokale.filter((l) => {
    const matchPietro =
      filterPietro === "wszystkie" || l.pietro === filterPietro;
    const matchStatus =
      filterStatus === "wszystkie" || l.status === filterStatus;
    return matchPietro && matchStatus;
  });

  const sold = lokale.filter((l) => l.status === "Sprzedany").length;
  const pct = lokale.length > 0 ? (sold / lokale.length) * 100 : 0;

  return (
    <section
      id="apartamenty"
      ref={sectionRef}
      className="py-24 px-6 bg-brand-cream"
      aria-labelledby="apartamenty-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-brand-wood text-xs font-medium tracking-[0.3em] uppercase mb-3">
              Oferta
            </p>
            <h2
              id="apartamenty-title"
              className="font-display text-4xl md:text-5xl font-semibold text-brand-dark"
            >
              Dostępne lokale
            </h2>
          </div>

          {/* Progress bar sprzedaży */}
          <div className="md:w-72">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Sprzedaż</span>
              <span>{sold} / {lokale.length} lokali</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-wood rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Filtry */}
        <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Filtry lokali">
          <div className="flex gap-2 flex-wrap">
            {["wszystkie", "Parter", "I piętro"].map((v) => (
              <button
                key={v}
                onClick={() => setFilterPietro(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  filterPietro === v
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-wood"
                }`}
                aria-pressed={filterPietro === v}
              >
                {v === "wszystkie" ? "Wszystkie piętra" : v}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["wszystkie", "Dostępny", "Rezerwacja", "Sprzedany"].map((v) => (
              <button
                key={v}
                onClick={() => setFilterStatus(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  filterStatus === v
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-wood"
                }`}
                aria-pressed={filterStatus === v}
              >
                {v === "wszystkie" ? "Wszystkie statusy" : v}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela / Karty */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Desktop: tabela */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" aria-label="Tabela dostępnych lokali">
              <thead className="bg-brand-dark text-white">
                <tr>
                  {["Nr lokalu", "Piętro", "Metraż", "Pokoje", "Udogodnienia", "Cena/m²", "Cena całk.", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium tracking-wider uppercase px-6 py-4"
                        scope="col"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filtered.map((l) => (
                    <motion.tr
                      key={l.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-brand-cream/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-5 font-semibold text-brand-dark">
                        Lokal {l.nr}
                      </td>
                      <td className="px-6 py-5 text-gray-600">{l.pietro}</td>
                      <td className="px-6 py-5 font-medium">{l.metraz} m²</td>
                      <td className="px-6 py-5 text-gray-600">{l.pokoje}</td>
                      <td className="px-6 py-5">
                        <div className="flex gap-1 flex-wrap">
                          {l.garaz && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              Garaż
                            </span>
                          )}
                          {l.taras_dachowy && (
                            <span className="text-xs bg-brand-wood/10 text-brand-wood px-2 py-1 rounded-full font-medium">
                              Dach tarasowy ★
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {l.cena_m2.toLocaleString("pl-PL")} zł
                      </td>
                      <td className="px-6 py-5 font-semibold text-brand-dark">
                        {l.cena_total.toLocaleString("pl-PL")} zł
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusColor[l.status]}`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {l.status === "Dostępny" && (
                          <button
                            onClick={() => setSelected(l)}
                            className="text-xs font-medium text-brand-wood hover:text-brand-dark underline underline-offset-2 transition-colors"
                            aria-label={`Zapytaj o lokal ${l.nr}`}
                          >
                            Zapytaj
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile: karty */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((l) => (
              <div key={l.id} className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-brand-dark">
                      Lokal {l.nr}
                    </p>
                    <p className="text-sm text-gray-500">{l.pietro}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusColor[l.status]}`}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">Metraż</p>
                    <p className="font-medium">{l.metraz} m²</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Pokoje</p>
                    <p className="font-medium">{l.pokoje}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Cena</p>
                    <p className="font-medium text-brand-dark">
                      {(l.cena_total / 1000).toFixed(0)}k zł
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {l.garaz && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      Garaż
                    </span>
                  )}
                  {l.taras_dachowy && (
                    <span className="text-xs bg-brand-wood/10 text-brand-wood px-2 py-1 rounded-full font-medium">
                      Dach tarasowy ★
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          * Ceny są cenami brutto. Aktualna oferta na dzień {new Date().toLocaleDateString("pl-PL")}.
          Deweloper zastrzega prawo do zmiany cen.
        </p>
      </div>

      {/* Modal zapytania */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="modal-title"
                className="font-display text-2xl font-semibold text-brand-dark mb-2"
              >
                Lokal {selected.nr}
              </h3>
              <p className="text-gray-500 mb-6">
                {selected.metraz} m² · {selected.pokoje} pokoje · {selected.pietro}
              </p>
              <p className="text-brand-dark font-semibold text-xl mb-6">
                {selected.cena_total.toLocaleString("pl-PL")} zł
              </p>
              <a
                href="/#kontakt"
                className="block text-center bg-brand-wood text-white font-medium py-3 rounded-full hover:bg-brand-dark transition-colors"
                onClick={() => setSelected(null)}
              >
                Przejdź do formularza kontaktowego
              </a>
              <button
                className="mt-3 w-full text-center text-gray-400 text-sm hover:text-gray-600"
                onClick={() => setSelected(null)}
                aria-label="Zamknij"
              >
                Zamknij
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
