"use client";

import { useEffect } from "react";

interface Props {
  lat: number;
  lng: number;
}

export default function MapComponent({ lat, lng }: Props) {
  useEffect(() => {
    let map: import("leaflet").Map | null = null;

    import("leaflet").then((L) => {
      // Napraw ikony Leaflet w Next.js
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
        ._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      map = L.map("leaflet-map", { zoomControl: true }).setView(
        [lat, lng],
        15
      );

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          '<strong>Topolska Residence</strong><br>ul. Topolska, Środa Wlkp.'
        )
        .openPopup();
    });

    // Załaduj CSS Leaflet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    return () => {
      map?.remove();
    };
  }, [lat, lng]);

  return (
    <div
      id="leaflet-map"
      className="w-full h-full"
      role="application"
      aria-label="Mapa lokalizacji inwestycji Topolska Residence w Środzie Wielkopolskiej"
    />
  );
}
