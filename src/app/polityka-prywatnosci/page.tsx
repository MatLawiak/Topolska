import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności – Topolska Residence",
};

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 px-6 bg-brand-light min-h-screen">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="font-display text-4xl font-semibold text-brand-dark mb-8">
            Polityka prywatności
          </h1>

          <h2>1. Administrator danych</h2>
          <p>
            Administratorem Twoich danych osobowych jest deweloper inwestycji
            Topolska Residence z siedzibą w Środzie Wielkopolskiej.
            Kontakt: kontakt@topolska-residence.pl
          </p>

          <h2>2. Cel i podstawa przetwarzania danych</h2>
          <p>
            Twoje dane przetwarzamy w celu obsługi zapytań za pośrednictwem
            formularza kontaktowego (art. 6 ust. 1 lit. f RODO – prawnie
            uzasadniony interes) oraz, po udzieleniu zgody, w celach
            marketingowych i analitycznych.
          </p>

          <h2>3. Zakres przetwarzanych danych</h2>
          <p>
            Przetwarzamy dane podane dobrowolnie w formularzu kontaktowym:
            imię i nazwisko, adres e-mail, numer telefonu oraz treść
            wiadomości.
          </p>

          <h2>4. Pliki cookie</h2>
          <p>
            Strona używa plików cookie w celu analizy ruchu (Google Analytics
            lub podobne narzędzie) oraz zapewnienia prawidłowego działania
            serwisu. Pliki analityczne są wczytywane wyłącznie po wyrażeniu
            zgody przez użytkownika.
          </p>

          <h2>5. Prawa użytkownika</h2>
          <p>
            Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu.
            Skontaktuj się z nami pod adresem e-mail wskazanym w pkt 1.
          </p>

          <h2>6. Okres przechowywania danych</h2>
          <p>
            Dane z formularza kontaktowego przechowujemy przez czas niezbędny
            do obsługi zapytania, nie dłużej niż 3 lata od ostatniego kontaktu.
          </p>

          <h2>7. Kontakt w sprawie danych osobowych</h2>
          <p>
            W sprawie danych osobowych skontaktuj się z nami:
            kontakt@topolska-residence.pl
          </p>

          <p className="text-sm text-gray-400 mt-12">
            Ostatnia aktualizacja: marzec 2026
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
