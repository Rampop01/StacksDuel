import type { Metadata } from "next";
import { StacksProvider } from "@/components/StacksProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "StacksDuel | Decentralized Gaming Duels",
  description: "Challenge players, stake STX, and win rewards in decentralized glassmorphism-styled duels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StacksProvider>
          <Navbar />
          <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            {children}
          </main>
        </StacksProvider>
      </body>
    </html>
  );
}
