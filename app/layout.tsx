import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Poppins } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Beatryz Kleuvyn - Data Scientist & Educator",
  description:
    "Personal website of Beatryz Kleuvyn, Data Scientist and Educator specializing in machine learning, statistical analysis, and data visualization.",
  keywords: ["data science", "education", "machine learning", "statistics", "research"],
  authors: [{ name: "Beatryz Kleuvyn" }],
  openGraph: {
    title: "Beatryz Kleuvyn - Data Scientist & Educator",
    description: "Transforming data into insights and knowledge into impact",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <body className={`${inter.className} ${playfair.className} ${poppins.className}`}>
        {children}
      </body>
    </html>
  )
}
