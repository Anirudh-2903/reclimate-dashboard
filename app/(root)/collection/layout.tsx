import { Metadata } from "next";
import { ReactNode } from "react";

// Function to generate dynamic metadata (Override in individual pages)
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Reclimate | Collection",
  openGraph: {
    title: "Reclimate | Collection",
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

// Layout Component
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
