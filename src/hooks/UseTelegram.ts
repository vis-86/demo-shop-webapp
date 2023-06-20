import { useEffect, useState } from "react"

const isTgEnabled = (webApp: WebApp | null | undefined): boolean => {
    return webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.query_id ? true : false
}

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

    const showBackButton = (onClick: () => void) => {
        if (!isTgEnabled(webApp)) {
            return
        }
        webApp?.BackButton.show()
        webApp?.BackButton.onClick(() => {
            onClick()
            webApp?.BackButton.hide()
        })
    }

    const expand = () => {
        if (!isTgEnabled(webApp)) {
            return
        }
        webApp?.expand();
    }

    const hapticFeedback = () => {
        if (!isTgEnabled(webApp)) {
            return
        }
        webApp?.HapticFeedback.impactOccurred('soft')
    }

    const setMainButtonParams = (params: MainButtonParams, onClick?: () => void): null | MainButton => {
        if (!isTgEnabled(webApp) || !webApp?.MainButton) {
            return null
        }
        webApp?.MainButton.setParams(params)
        if (onClick) {
            webApp?.MainButton.onClick(onClick)
        }
        return webApp?.MainButton
    }

    return {
        enabled: isTgEnabled(webApp),
        tg: webApp,
        tgApi: {
            expand,
            onClose,
            onToggleButton,
            showBackButton,
            hapticFeedback,
            setMainButtonParams
        },
        user
    }
}