import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audit Métabolique Complet | AchZod Coaching",
  description: "Découvre ton profil métabolique unique et reçois ton plan personnalisé d'optimisation hormonale et nutritionnelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-dark text-light`}
      >
        {children}
      </body>
    </html>
  );
}
