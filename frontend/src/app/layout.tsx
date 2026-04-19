import type { Metadata } from "next";
import { StacksProvider } from "@/components/StacksProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "StacksDuel | Decentralized Gaming Duels",
  description: "Challenge players, stake STX, and win rewards in decentralized glassmorphism-styled duels.",
  other: {
    "talentapp:project_verification": "48fa7a0da97de08321b637387d93fae1f1c7891a9f2c793512768b2436947b2c03759725e85778662b3dae7c637ea8df7cd4ac5b71891d1eb430f3fce7c14cf2"
  }
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
