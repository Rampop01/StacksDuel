import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { StacksProvider } from "@/components/StacksProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "StacksDuel | High-Stakes Arena",
  description: "The premier decentralized battleground on Stacks.",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="mesh-bg" />
        <StacksProvider>
          <Navbar />
          {children}
        </StacksProvider>
      </body>
    </html>
  );
}
