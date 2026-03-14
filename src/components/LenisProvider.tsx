"use client";

import { useEffect, useState } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [LenisComponent, setLenisComponent] = useState<React.ComponentType<{
    root: boolean;
    options: object;
    children: React.ReactNode;
  }> | null>(null);

  useEffect(() => {
    // Ładuj Lenis tylko w przeglądarce — nigdy podczas SSR/prerendering
    import("lenis/react").then((m) => {
      setLenisComponent(() => m.ReactLenis as React.ComponentType<{
        root: boolean;
        options: object;
        children: React.ReactNode;
      }>);
    });
  }, []);

  if (!LenisComponent) {
    return <>{children}</>;
  }

  return (
    <LenisComponent
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </LenisComponent>
  );
}
