import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metryca | 360",
  description: "Tours Virtuales",
  openGraph: {
    title: "Metryca | 360",
    description: "Tours Virtuales",
    url: "https://metryca.inlaab.com",
    siteName: "Metryca",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Metryca | 360",
    description: "Tours Virtuales",
  },
};

export default function MetrycaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
