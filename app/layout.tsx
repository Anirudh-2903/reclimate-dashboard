import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reclimate | Home",
  description: "Driving sustainable solutions by transforming waste into valuable resources and scaling carbon removals.",
  keywords: [
    "climate tech",
    "sustainable agriculture",
    "carbon removals",
    "biochar",
    "Reclimate",
  ],
  authors: [{ name: "Anirudh Das", url: "https://portfolio.anirudh-das.in" }],
  creator: "Reclimate",
  publisher: "Reclimate",
  openGraph: {
    title: "Empowering Climate Action | Reclimate",
    description: "Join us in transforming waste into valuable resources and scaling carbon removals for a sustainable future.",
    url: "https://reclimate-dashboard-five.vercel.app",
    siteName: "Reclimate",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://reclimate-dashboard-five.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_green.png" sizes="any" />
        <link rel="icon" href="/logo_green.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_green.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray`}
      >
        {children}
      <Toaster richColors />
      </body>
    </html>
  );
}
