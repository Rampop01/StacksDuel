import type { Metadata } from "next";
import { StacksProvider } from "@/components/StacksProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "StacksDuel | High-Stakes Arena",
  description: "The premier decentralized battleground on Stacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mesh-bg" />
        <StacksProvider>
          <Navbar />
          {children}
        </StacksProvider>
      </body>
    </html>
  );
}
