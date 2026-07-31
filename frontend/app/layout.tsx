import type { Metadata } from "next";
import { Libre_Baskerville, Cinzel } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-libre",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Past in a Glass",
  description: "Every classic cocktail carries a story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libre.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
