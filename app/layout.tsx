import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shruthi & Deepak — 26 February 2027",
  description: "Join Shruthi and Deepak for their wedding celebration in New Jersey on 26 February 2027.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Shruthi & Deepak — 26 February 2027",
    description: "Join Shruthi and Deepak for their wedding celebration in New Jersey on 26 February 2027.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Shruthi & Deepak Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shruthi & Deepak — 26 February 2027",
    description: "Join Shruthi and Deepak for their wedding celebration in New Jersey on 26 February 2027.",
    images: ["/og-image.jpg"],
  },
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
