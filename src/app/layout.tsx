import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Deloitte's Weihnachts-Quiz-Spektakel"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-snow-white text-pine-green flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow flex flex-col items-center justify-start pt-4">
          {children}
        </main>
        <Footer />
        <Analytics /> 
      </body>
    </html>
  )
}

