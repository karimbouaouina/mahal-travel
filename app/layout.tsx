import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://opalenoire.tn";

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Opale Noire | Reservation d'hotels et seminaires en Tunisie",
    template: "%s | Opale Noire",
  },
  description:
    "Opale Noire accompagne les reservations d'hotels, groupes et seminaires en Tunisie avec un focus sur Sousse, Hammamet et Monastir.",
  applicationName: "Opale Noire",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Opale Noire",
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
  authors: [{ name: "Opale Noire" }],
  creator: "Opale Noire",
  publisher: "Opale Noire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
    shortcut: ["/favicon-32x32.png"],
    apple: [{ url: "/images/whiteOutlineLogoWithoutText.png" }],
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
    siteName: "Opale Noire",
    title: "Opale Noire | Reservation d'hotels et seminaires en Tunisie",
    description:
      "Selection d'hotels, reservations groupes et accompagnement seminaire en Tunisie, avec un focus fort sur Sousse.",
    images: [
      {
        url: "/images/whiteOutlineLogoWithoutText.png",
        width: 512,
        height: 512,
        alt: "Logo Opale Noire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opale Noire | Reservation d'hotels et seminaires en Tunisie",
    description:
      "Reservations d'hotels, groupes et seminaires en Tunisie avec un focus fort sur Sousse.",
    images: ["/images/whiteOutlineLogoWithoutText.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
