'use server';

import { Product, ProductDetail } from "@/fetcher/interfaces/product/Product";
import { serverPost } from "../ServerFetcher";

interface GetProductListRequest {
    search?: string
    pageNumber: number
    size: number
}

export async function asyncProductList(params: GetProductListRequest) {
    return serverPost<Product[]>({
        url: '/product/list',
        params,
    });
}

export async function asyncProductDetail(params: { id: string }) {
    return serverPost<ProductDetail>({
        url: '/product',
        params,
    });
}
