import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://shruthi-weds-deepak.invitingyou.top";

export const viewport: Viewport = {
  themeColor: "#6E1824",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shruthi & Deepak — Wedding Invitation | 26 February 2027",
  description:
    "ஒளியும் ஒலியும் சேரும் தருணம் — When sound found light. With full hearts, join Shruthi & Deepak to celebrate their wedding on Friday, 26 February 2027 in New Jersey.",
  applicationName: "Shruthi & Deepak Wedding Invitation",
  authors: [{ name: "Shruthi & Deepak" }],
  keywords: [
    "Shruthi and Deepak",
    "Shruthi Deepak Wedding",
    "Wedding Invitation",
    "Tamil Wedding",
    "Bridgewater Temple",
    "The Meadow Wood",
    "Sound and Light",
    "ஒலி ஒளி",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Shruthi & Deepak — Wedding Invitation",
    title: "Shruthi & Deepak — Wedding Invitation | 26 February 2027",
    description:
      "ஒளியும் ஒலியும் சேரும் தருணம் — When sound found light. Join us for a sacred morning at Sri Venkateswara Temple and an evening celebration at The Meadow Wood.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        secureUrl: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 675,
        type: "image/jpeg",
        alt: "Shruthi & Deepak — Wedding Invitation (ஒலி × ஒளி)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shruthi & Deepak — Wedding Invitation | 26 February 2027",
    description:
      "ஒளியும் ஒலியும் சேரும் தருணம் — When sound found light. Join us for our wedding celebrations on Friday, 26 February 2027.",
    images: [`${SITE_URL}/og-image.jpg`],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
