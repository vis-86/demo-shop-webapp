'use client'

import Script from 'next/script'
import { useTelegram } from '@/hooks/UseTelegram'

const TelegramBotComponent = () => {
    const { setLoading } = useTelegram()

    return <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={() => setLoading(false)} />
}

export { TelegramBotComponent }