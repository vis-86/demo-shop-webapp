'use client'

export function useTelegram() {
    return {
        tgApp: () => {
            return window && window.Telegram ? window.Telegram.WebApp : null
        },
        isTgEnabled: (tg: WebApp) => {
            return tg && tg.initDataUnsafe && tg.initDataUnsafe.query_id ? true : false
        }
    }
}