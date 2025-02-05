import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Layout from "./components/layout/Layout";
import './globals.css';
import './styles/swiper.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'בינה בקיצור - פלטפורמת AI בעברית',
  description: 'פלטפורמה מודרנית להצגת יישומי AI וכלים חדשניים בתחום הבינה המלאכותית',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable}`}>
      <head>
        <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={`${rubik.className} min-h-screen bg-gradient-to-b from-black via-purple-950 to-black`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
