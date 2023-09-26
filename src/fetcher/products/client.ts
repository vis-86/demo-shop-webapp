'use client';

import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import { SaveResponse } from '@/fetcher/interfaces/core/SaveResponse';
import { Product, ProductDetail } from '@/fetcher/interfaces/product/Product';

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
  return useMutation<ProductDetail, SaveResponse>({
    url: '/api/product/save',
  });
}
