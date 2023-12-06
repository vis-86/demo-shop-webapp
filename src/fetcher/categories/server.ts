'use server';

import { Category } from "@/fetcher/interfaces/product/Product";
import { serverPost } from "../ServerFetcher";

interface GetListRequest {
    search?: string
    pageNumber: number
    size: number
}

export async function asyncCategoryList(params: GetListRequest) {
    return serverPost<Category[]>({
        url: '/bot/product/categories',
        params,
    });
}
