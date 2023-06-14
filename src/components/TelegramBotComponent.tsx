'use client'

import Script from 'next/script'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

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

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const tg = window.Telegram ? window.Telegram.WebApp : null
        tg && tg.ready()
    }, [])

    const onClose = () => {
        const tg = window.Telegram ? window.Telegram.WebApp : null
        tg && tg.close()
    }

    return (
        <>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                onLoad={() => {
                    console.log(`script loaded correctly, window.FB has been populated`)
                    setLoading(true)
                }} />
            {loading ? <div>
                <button onClick={onClose}>Закрыть</button>
            </div> : null}
        </>
    )
}

export { TelegramBotComponent }