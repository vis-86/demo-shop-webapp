export type Product = {
    id: number
    name: string,
    imgThumbUrl: string,
    volumes: ProductVolume[]
}

export type ProductVolume = {
    volume: number,
    price: number
}