const impactOccurredMedium = (tg: WebApp | null) => {
    tg?.HapticFeedback.impactOccurred('medium')
}

export {
    impactOccurredMedium
}