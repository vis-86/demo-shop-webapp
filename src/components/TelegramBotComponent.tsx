'use client'

import React, { useEffect } from 'react'


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
        <div><button onClick={onClose}>Закрыть</button></div>
    )
}

export { TelegramBotComponent }