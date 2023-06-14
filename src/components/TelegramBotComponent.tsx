'use client'

import React, { useEffect } from 'react'

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void
                close: () => void
            }
        }
    }
}

const TelegramBotComponent = () => {

    useEffect(() => {
        const tg = window.Telegram ? window.Telegram.WebApp : null

        tg && tg.ready()
    }, [])

    const onClose = () => {
        const tg = window.Telegram ? window.Telegram.WebApp : null
        tg && tg.close()
    }

    return (
        <div>
            <button onClick={onClose}>Закрыть</button>
            <script src="https://telegram.org/js/telegram-web-app.js"></script>
        </div>
    )
}

export { TelegramBotComponent }