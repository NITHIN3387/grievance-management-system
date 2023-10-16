import "@assets/styles/globals.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Government Grievance Management System',
  description: 'The Government Grievance Management Website is a user-friendly online platform designed to facilitate seamless communication between citizens and the government, ensuring a transparent and accountable governance system. This interactive portal empowers citizens to voice their concerns, complaints, and feedback regarding various aspects of government services, policies, and administrative processes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
