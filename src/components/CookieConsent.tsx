"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-live="polite"
        >
          <p
            id="cookie-title"
            className="font-semibold text-brand-dark text-sm mb-2"
          >
            Pliki cookie 🍪
          </p>
          <p className="text-gray-500 text-xs leading-relaxed mb-4">
            Używamy plików cookie do analizy ruchu i personalizacji treści.
            Szczegóły w{" "}
            <a
              href="/polityka-prywatnosci/"
              className="text-brand-wood underline"
            >
              Polityce prywatności
            </a>
            .
          </p>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="flex-1 bg-brand-wood text-white text-xs font-medium py-2 rounded-full hover:bg-brand-dark transition-colors"
            >
              Akceptuję
            </button>
            <button
              onClick={decline}
              className="flex-1 border border-gray-200 text-gray-500 text-xs font-medium py-2 rounded-full hover:border-gray-400 transition-colors"
            >
              Odrzucam
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
