'use client'

import { useEffect, useState } from "react"

export function useTelegram() {
    const [tg, setTg] = useState<WebApp | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (loading) return
        const _tg = window && window.Telegram ? window.Telegram.WebApp : null
        setTg(window && window.Telegram ? window.Telegram.WebApp : null)
        console.log('TG_RENDER', _tg)
    }, [loading])

    const isTgEnabled = (): boolean => {
        return tg && tg.initDataUnsafe && tg.initDataUnsafe.query_id ? true : false
    }
    const onClose = () => {
        tg && tg.close()
    }

    const onToggleButton = () => {
        if (!tg || !tg.MainButton) {
            return
        }
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    const hideBackButton = () => {
        if (!isTgEnabled()) {
            return
        }
        tg?.BackButton.hide()
    }

    const showBackButton = (onClick: () => void) => {
        if (!isTgEnabled()) {
            return
        }
        tg?.BackButton.show()
        tg?.BackButton.onClick(() => {
            hideBackButton()
            onClick()
        })
    }

    const expand = () => {
        if (!isTgEnabled()) {
            return
        }
        tg?.expand();
    }

    const hapticFeedback = () => {
        if (!isTgEnabled()) {
            return
        }
        tg?.HapticFeedback.impactOccurred('medium')
    }

    const setMainButtonParams = (
        params: MainButtonParams,
        onClick?: () => void
    ) => {
        if (!tg || !isTgEnabled() || !tg?.MainButton) {
            return
        }
        tg.MainButton.setParams(params)
        onClick && tg.MainButton.onClick(onClick)
    }

    return {
        enabled: isTgEnabled(),
        setLoading,
        tg,
        tgApi: {
            MainButton: tg?.MainButton,
            expand,
            onClose,
            onToggleButton,
            showBackButton,
            hideBackButton,
            hapticFeedback,
            setMainButtonParams
        }
    }
}