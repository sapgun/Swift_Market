import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Swift Market - XRPL P2P Marketplace',
  description:
    'Revolutionizing cross-border e-commerce with near-zero fees and instant settlement on the XRP Ledger',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
