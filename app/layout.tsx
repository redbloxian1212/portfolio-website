import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

const title = "src · Luau Programmer";
const description =
  "Luau programmer for live Roblox games: backend, performance, and LiveOps. Case studies from Crazy Chefs, Shoot the Brainrots, and +1 Speed Bridge Building.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · src",
  },
  description,
  openGraph: {
    title,
    description,
    siteName: "src",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.className} bg-[#0d0d0d] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
