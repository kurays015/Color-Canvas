import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/provider/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Color Canvas",
  description:
    "A Collaborative Color Canvas. You can draw and mint your art creation as NFT on Monad Blockchain",
  creator: "Kurays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 overflow-hidden">
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
