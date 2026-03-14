import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Topolska Residence – Premium nieruchomości w Środzie Wielkopolskiej",
  description:
    "Kameralna inwestycja premium przy ul. Topolskiej w Środzie Wielkopolskiej. 4 ekskluzywne lokale z garażami i dachem tarasowym. 30 km od Poznania.",
  keywords:
    "Topolska Residence, mieszkania Środa Wielkopolska, nieruchomości Środa Wlkp, domy premium Poznań okolice",
  openGraph: {
    title: "Topolska Residence – Premium nieruchomości",
    description:
      "Kameralna inwestycja przy ul. Topolskiej. 4 lokale, garaże, dach tarasowy. 30 km od Poznania.",
    images: ["/images/hero.png"],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              name: "Topolska Residence",
              description:
                "Kameralna inwestycja premium przy ul. Topolskiej w Środzie Wielkopolskiej",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ul. Topolska",
                addressLocality: "Środa Wielkopolska",
                postalCode: "63-000",
                addressCountry: "PL",
              },
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-nav">
          Przejdź do treści
        </a>
        <LenisProvider>
          <main id="main">{children}</main>
        </LenisProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
