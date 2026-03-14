"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "/#o-inwestycji", label: "O inwestycji" },
  { href: "/#apartamenty", label: "Apartamenty" },
  { href: "/#lokalizacja", label: "Lokalizacja" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.08)" : "none",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4"
        aria-label="Nawigacja główna"
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-display font-semibold text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-brand-dark" : "text-white"
          }`}
          aria-label="Topolska Residence – strona główna"
        >
          Topolska <span className="text-brand-wood">Residence</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-brand-wood ${
                  scrolled ? "text-brand-dark" : "text-white/90"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#kontakt"
          className="hidden md:inline-flex items-center gap-2 bg-brand-wood text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors duration-300"
        >
          Sprawdź dostępność
        </a>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? "text-brand-dark" : "text-white"
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 pb-6 pt-2"
          >
            <ul className="flex flex-col gap-4" role="list">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-brand-dark font-medium text-base hover:text-brand-wood transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#kontakt"
                  className="inline-flex bg-brand-wood text-white font-medium px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sprawdź dostępność
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
