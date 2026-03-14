import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111] text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Marka */}
          <div>
            <p className="font-display font-semibold text-xl text-white mb-3">
              Topolska{" "}
              <span className="text-brand-wood">Residence</span>
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Kameralna inwestycja premium przy ul. Topolskiej
              w Środzie Wielkopolskiej. 30 km od Poznania.
            </p>
          </div>

          {/* Nawigacja */}
          <nav aria-label="Nawigacja stopki">
            <p className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Nawigacja
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/#o-inwestycji", label: "O inwestycji" },
                { href: "/#apartamenty", label: "Apartamenty" },
                { href: "/#lokalizacja", label: "Lokalizacja" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#kontakt", label: "Kontakt" },
                {
                  href: "/polityka-prywatnosci/",
                  label: "Polityka prywatności",
                },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-brand-wood transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dane dewelopera */}
          <div>
            <p className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Deweloper
            </p>
            <address className="not-italic text-sm leading-relaxed space-y-1">
              <p className="text-white/80">[Nazwa dewelopera]</p>
              <p>ul. Topolska, 63-000 Środa Wlkp.</p>
              <p>
                KRS: <span className="text-white/40">[do uzupełnienia]</span>
              </p>
              <p>
                NIP: <span className="text-white/40">[do uzupełnienia]</span>
              </p>
              <p>
                REGON:{" "}
                <span className="text-white/40">[do uzupełnienia]</span>
              </p>
              <p className="mt-3">
                <a
                  href="mailto:kontakt@topolska-residence.pl"
                  className="hover:text-brand-wood transition-colors"
                >
                  kontakt@topolska-residence.pl
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {year} Topolska Residence. Wszelkie prawa zastrzeżone.</p>
          <p>
            Projekt i realizacja:{" "}
            <a
              href="https://twistedpixel.pl"
              className="text-brand-wood hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twisted Pixel
            </a>
          </p>
          <a
            href="/dane-gov/cennik_latest.csv"
            className="hover:text-brand-wood transition-colors"
            download
          >
            Cennik dane.gov.pl (CSV)
          </a>
        </div>
      </div>
    </footer>
  );
}
