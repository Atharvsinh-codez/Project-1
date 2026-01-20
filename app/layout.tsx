import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://draviya.com"),
  title: {
    default: "Project-1 | Invest in Creators",
    template: "%s | Project-1",
  },
  description:
    "We’re turning your favorite creators into Investable tokens(similar to stocks). Buy, sell, and grow with the creators you believe in.",
  keywords: [
    "Creator Economy",
    "Invest in Creators",
    "Creator Tokens",
    "Project-1",
    "Social Tokens",
  ],
  authors: [{ name: "Project-1 Team" }],
  creator: "Project-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://draviya.com",
    title: "Project-1 | Invest in Creators",
    description:
      "We’re turning your favorite creators into Investable tokens(similar to stocks). Buy, sell, and grow with the creators you believe in.",
    siteName: "Project-1",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public folder later if not present
        width: 1200,
        height: 630,
        alt: "Project-1 - Invest in Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project-1 | Invest in Creators",
    description:
      "We’re turning your favorite creators into Investable tokens(similar to stocks). Buy, sell, and grow with the creators you believe in.",
    images: ["/og-image.jpg"],
    creator: "@athrix_codes",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${figtree.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Project-1",
              url: "https://draviya.com",
              logo: "https://draviya.com/images/logo/logo-icon.png",
              sameAs: [
                "https://x.com/athrix_codes",
                "https://github.com/Atharvsinh-codez/Project-1",
              ],
              description:
                "We’re turning your favorite creators into Investable tokens(similar to stocks). Buy, sell, and grow with the creators you believe in.",
            }),
          }}
        />
      </body>
    </html>
  );
}
