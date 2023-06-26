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

    const hideBackButton = () => {
        if (!isTgEnabled(webApp)) {
            return
        }
        webApp?.BackButton.hide()
    }

    const showBackButton = (onClick: () => void) => {
        if (!isTgEnabled(webApp)) {
            return
        }
        webApp?.BackButton.show()
        webApp?.BackButton.onClick(() => {
            hideBackButton()
            onClick()
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
        webApp?.HapticFeedback.impactOccurred('medium')
    }

    const setMainButtonParams = (
        params: MainButtonParams,
        onClick?: () => void
    ) => {
        if (!webApp || !isTgEnabled(webApp) || !webApp?.MainButton) {
            return
        }
        webApp.MainButton.setParams(params)
        onClick && webApp.MainButton.onClick(onClick)
    }

    return {
        enabled: isTgEnabled(webApp),
        tg: webApp,
        tgApi: {
            expand,
            onClose,
            onToggleButton,
            showBackButton,
            hideBackButton,
            hapticFeedback,
            setMainButtonParams
        },
        user
    }
}