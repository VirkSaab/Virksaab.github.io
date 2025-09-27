import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jitender Singh - Cyberpunk Resume',
  description: 'A cyberpunk-styled resume showcasing skills and experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cyber-darker text-white antialiased">
        <div className="relative min-h-screen">
          {/* Subtle cyberpunk grid background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-darker to-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}