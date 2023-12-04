import './globals.css'
import { Oswald } from 'next/font/google'
import EcommerceComponent from '@/components/EcommerceComponent'

const roboto = Oswald({ subsets: ['cyrillic', 'cyrillic-ext', 'latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className='container'>
          <EcommerceComponent
            botId={process.env.MERCHANT_ID || 1}
            merchantId={process.env.BOT_ID || 1}
          >
            {children}
          </EcommerceComponent>
        </div>
      </body>
    </html>
  )
}
