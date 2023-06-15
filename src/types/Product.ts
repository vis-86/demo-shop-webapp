export type Product = {
    name: string,
    imgThumbUrl: string,
    values: Array<ProductValue>
}

export type ProductValue = {
    value: number,
    price: number
}