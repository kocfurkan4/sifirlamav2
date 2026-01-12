import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Silah Sıfırlama Uygulaması',
  description: 'Profesyonel silah sıfırlama ve atış takip sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
