import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { Navbar } from "./_chrome/Navbar";
import { LenisProvider } from "./_chrome/LenisProvider";
import { AtmosferaProvider } from "./_chrome/atmosferas/AtmosferaProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delfina Gayoso",
  description: "Aprender cocina junto a Delfina.",
  twitter: {
    images: "cover-desayunos-meriendas",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA", // Harina: el universo es luminoso (sin modo oscuro, B3 §7)
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang rioplatense: su voz, humor y registro son en español (B3 §7).
    <html lang="es" className={fontVariables}>
      <body>
        <AtmosferaProvider>
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </AtmosferaProvider>
      </body>
    </html>
  );
}
