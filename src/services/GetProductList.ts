import { Product } from "../types/Product";

export const getProductList = async (): Promise<Product[]> => {
    const response = await fetch('/api/products')
    if (!response.ok) {
        throw new Error("Unable to fetch price menu.")
    }
    return response.json();
}

export const getProductById = async (id: number): Promise<Product> => {
    const response = await fetch('/api/products/' + id)
    if (!response.ok) {
        throw new Error("Unable to fetch price menu.")
    }
    return response.json();
}