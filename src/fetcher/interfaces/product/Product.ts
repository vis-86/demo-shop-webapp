export interface Product {
    id?: number
    name: string
    bgColor?: string
    textColor?: string
    description?: string
    metric?: string
    imgPath: string
    startDate?: Date
    endDate?: Date
    updateDate?: Date
    updatedBy?: string
    priceFrom?: ProductOption
    categoryList?: Category[]
}

export interface ProductOption {
    id: number
    price: number
    volume: number
    currency?: string
    imgPath?: string
}

export interface Category {
    id: number
    displayName: string
}

export interface ProductDetail {
    id: number
    name: string
    bgColor?: string
    textColor?: string
    description?: string
    metric?: string
    imgBase64?: string | null
    imgName?: string
    img?: File
    imgPath?: string
    startDate?: Date
    endDate?: Date
    updateDate?: Date
    updatedBy?: string
    options?: ProductOption[]
    categoryList?: Category[]
}

export interface ProductInCart {
    productId: number
    name: string,
    imgThumbUrl?: string,
    option?: ProductOption,
    optionId?: number
    count: number,
    metric?: string
}