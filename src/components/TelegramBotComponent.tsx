'use client'

import Script from 'next/script'
import React, { useState } from 'react'
import { useTelegram } from '@/hooks/UseTelegram'

const TelegramBotComponent = () => {

    const [loading, setLoading] = useState(false)
    const { enabled, onClose, user } = useTelegram()

    return (
        <>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                onLoad={() => setLoading(true)} />
            {enabled && loading ? <div>
                <h1>{user?.username}</h1>
                <button className='tg' onClick={onClose}>Закрыть</button>
            </div> : null}
        </>
    )
}

export { TelegramBotComponent }