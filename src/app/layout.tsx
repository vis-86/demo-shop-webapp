import './globals.css'
import { Oswald } from 'next/font/google'
import { TelegramBotComponent } from '@/components/TelegramBotComponent'

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
          <TelegramBotComponent />
          {children}
        </div>
      </body>
    </html>
  )
}
