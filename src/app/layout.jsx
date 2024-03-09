import { Roboto } from 'next/font/google';
import { Toaster } from "react-hot-toast";

import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Food Ordering App',
  description: 'Restaurant app using Next.js 14',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={roboto.className}>
        <main className="max-w-4xl min-h-[100dvh] mx-auto p-4 flex flex-col justify-between">
          <AppProvider>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
