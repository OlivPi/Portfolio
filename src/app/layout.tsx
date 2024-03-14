import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olivier Pierre - Portfolio",
  description: "Chef de projet et developpeur front-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
