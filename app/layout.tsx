import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shruthi & Deepak — 26 February 2027",
  description: "Join Shruthi and Deepak for their wedding celebration in New Jersey on 26 February 2027.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
