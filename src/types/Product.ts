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
    priceFrom?: Price
    categoryList?: Category[]
}

export interface Price {
    id: number
    price: number
    volume: number
    currency: string
}

export interface Category {
    id: number
    displayName: string
}

export interface ProductDetail {
    id?: number
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
    priceList?: Price[]
    categoryList?: Category[]
}

export type ProductVolume = {
    product?: Product,
    volume: number,
    inch: string,
    price: number
}

export type ProductInCart = {
    uniqId: number
    id?: number
    name: string,
    imgThumbUrl?: string,
    volume?: Price,
    count: number,
    metric?: string
}