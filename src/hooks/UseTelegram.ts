import { useEffect, useState } from "react"

export function useTelegram() {
    const [webApp, setWebApp] = useState<WebApp | null>()
    const [user, setUser] = useState<WebAppUser>()

    useEffect(() => {
        const tg = window.Telegram ? window.Telegram.WebApp : null
        tg && tg.ready()
        setWebApp(tg)
    }, [])

    useEffect(() => {
        setUser(webApp?.initDataUnsafe?.user)
    }, [webApp])

    const onClose = () => {
        webApp && webApp.close()
    }

    const onToggleButton = () => {
        if (!webApp || !webApp.MainButton) {
            return
        }
        if (webApp.MainButton.isVisible) {
            webApp.MainButton.hide()
        } else {
            webApp.MainButton.show()
        }
    }

    return {
        enabled: webApp && webApp.initDataUnsafe  && webApp.initDataUnsafe.query_id? true : false,
        tg: webApp,
        onClose,
        onToggleButton,
        user
    }
}