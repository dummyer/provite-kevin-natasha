import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Lora } from "next/font/google";
import { Noto_Sans } from 'next/font/google';
import { Baskervville } from "next/font/google";
import localFont from "next/font/local";
import { Pinyon_Script } from 'next/font/google';
import { Newsreader } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '500', '700', '800'],
  variable: '--font-noto-sans',
});

const pinyonScript = Pinyon_Script({
  weight: '400', // Pinyon Script cuma punya 1 weight: 400
  subsets: ['latin'],
  variable: "--font-pinyon-script",
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // pilih weight yang dipakai
  style: ['normal', 'italic'], // Newsreader punya varian italic, cocok buat date-block yang di desain awal itu italic
  variable: '--font-newsreader',
  display: 'swap',
});

const century = localFont({
  src: "/fonts/century_normal.ttf",
  variable: "--font-century",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskervville",
});

export const metadata: Metadata = {
  title: "",
  description:
    "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${lora.variable} ${notoSans.variable} 
    ${baskervville.variable} ${century.variable} ${pinyonScript.variable} ${newsreader.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}