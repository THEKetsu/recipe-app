import type { Metadata } from "next";
import { Inter, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
