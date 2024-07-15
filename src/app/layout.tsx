import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'A simple recipe application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}