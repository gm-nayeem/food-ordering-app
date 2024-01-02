import { Roboto } from 'next/font/google';
import { Toaster } from "react-hot-toast";

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Food Ordering App',
  description: 'Restaurant app using Next.js 14',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <Toaster />
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
