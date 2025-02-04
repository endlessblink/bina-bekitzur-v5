import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: "בינה בקיצור - פלטפורמת AI בעברית",
  description: "פלטפורמה מודרנית להצגת יישומי AI וכלים חדשניים בתחום הבינה המלאכותית",
};

import Layout from "./components/layout/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable}`}>
      <body className="font-rubik bg-black min-h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
