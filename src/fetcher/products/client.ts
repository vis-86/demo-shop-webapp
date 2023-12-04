'use client';

import useQuery from '@/hooks/useQuery';

import { Product, ProductDetail } from '@/fetcher/interfaces/';

interface GetProductListRequest {
  search?: string
  pageNumber: number
  size: number
}


interface GetProductIdRequest {
  id: number
}

export function useProductList(params: GetProductListRequest, initState?: Product[]) {
  return useQuery<Product[]>({
    url: '/api/bot/product/list',
    params,
    initState,
  });
}

export function useProductDetail(params: GetProductIdRequest, initState?: ProductDetail) {
  return useQuery<ProductDetail>({
    url: '/api/bot/product',
    params,
    initState,
  });
}
