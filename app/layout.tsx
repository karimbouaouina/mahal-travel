import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const siteUrl = "https://mahaltravel.vercel.app";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahal Travel | Reservation d'hotels et seminaires en Tunisie",
    template: "%s | Mahal Travel",
  },
  description:
    "Mahal Travel accompagne les reservations d'hotels, groupes et seminaires en Tunisie avec un focus sur Sousse, Hammamet, Monastir, Djerba et Tabarka.",
  applicationName: "Mahal Travel",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Mahal Travel",
    "reservation hotel Tunisie",
    "hotel Sousse",
    "seminaire Tunisie",
    "seminaire Sousse",
    "hotel Hammamet",
    "hotel Monastir",
    "reservation groupe Tunisie",
    "agence reservation hotel Tunisie",
  ],
  alternates: {
    canonical: "/",
  },
  category: "travel",
  authors: [{ name: "Mahal Travel" }],
  creator: "Mahal Travel",
  publisher: "Mahal Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/logo-mahalTravel-white-transparent.png", type: "image/png" }],
    shortcut: ["/logo-mahalTravel-white-transparent.png"],
    apple: [{ url: "/logo-mahalTravel-white-transparent.png" }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: siteUrl,
    siteName: "Mahal Travel",
    title: "Mahal Travel | Reservation d'hotels et seminaires en Tunisie",
    description:
      "Selection d'hotels, reservations groupes et accompagnement seminaire en Tunisie, avec une approche d'exception.",
    images: [
      {
        url: "/fullLogoMahalTravel-white-transparent.png",
        width: 1200,
        height: 630,
        alt: "Mahal Travel Tunisie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahal Travel | Reservation d'hotels et seminaires en Tunisie",
    description:
      "Reservations d'hotels, groupes et seminaires en Tunisie avec une approche d'exception.",
    images: ["/fullLogoMahalTravel-white-transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className={`${instrumentSans.variable} ${fraunces.variable} font-sans min-h-full flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
