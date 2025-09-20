import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Swift Market",
  description: "An XRPL-based Global P2P Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
