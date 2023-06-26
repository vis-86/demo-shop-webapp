export type Product = {
    id: number
    name: string,
    imgThumbUrl: string,
    volumes: ProductVolume[]
}

export type ProductVolume = {
    product?: Product,
    volume: number,
    price: number
}

export type ProductInCart = {
    id: number
    name: string,
    imgThumbUrl: string,
    volume: ProductVolume,
    count: number
}