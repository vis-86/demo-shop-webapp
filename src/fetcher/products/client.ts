'use client';

import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';

import { Product, ProductDetail, ResultResponse } from '@/fetcher/interfaces/';

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
    url: '/api/product/list',
    params,
    initState,
  });
}

export function useProductDetail(params: GetProductIdRequest, initState?: ProductDetail) {
  return useQuery<ProductDetail>({
    url: '/api/product',
    params,
    initState,
  });
}

export function useSave() {
  return useMutation<ProductDetail, ResultResponse>({
    url: '/api/product/save',
  });
}
