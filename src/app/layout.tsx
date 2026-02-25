import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import SchemaMarkup from "@/components/comunes/SchemaMarkup";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import { CONFIG_DEL_SITIO } from "@/lib/constantes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psicólogos CDMX",
  description: "Encuentra paz y bienestar con nuestros servicios de psicoterapia en la Ciudad de México. Especializados en ansiedad, estrés y desarrollo personal.",
  verification: {
    google: "_Fm4ekvin4Cd-5dV7K0rOFzk0tNE2ZiPVmNx01zVN4A"
  },
  icons: {
    icon: [
      {
        url: "logonew.svg",
        type: "image/svg+xml",
      },
    ],
  },
  other: {
    'fb:app_id': '1793839234687499',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@id": `${CONFIG_DEL_SITIO.url}#organization`,
    "name": CONFIG_DEL_SITIO.name,
    "url": "https://artstrokesmx.github.io/psicologoscdmx/", // 👈 URL REAL
    "logo": "/logonew.svg", // 👈 Reemplaza con tu logo
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONFIG_DEL_SITIO.phone, // 👈 Tu teléfono
      "contactType": "customer service"
    },
    "sameAs": CONFIG_DEL_SITIO.sameAs
  };

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SchemaMarkup 
          type="Organization" 
          schema={organizationSchema} 
        />
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
