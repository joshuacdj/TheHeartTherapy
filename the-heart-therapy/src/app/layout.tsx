import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Heart Therapy | Professional Counselling Services",
  description: "Professional counselling services by Hanyu. Creating a safe space for stress, anxiety, relationship challenges, and personal growth. Book your session today.",
  keywords: ["therapy", "counselling", "mental health", "singapore", "anxiety", "stress", "relationships"],
  authors: [{ name: "Hanyu", url: "mailto:thehearttherapysg@gmail.com" }],
  creator: "The Heart Therapy",
  openGraph: {
    title: "The Heart Therapy | Professional Counselling Services",
    description: "Professional counselling services creating a safe space for personal growth and mental wellbeing.",
    type: "website",
    locale: "en_SG",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ed4857" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
