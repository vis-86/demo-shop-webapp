'use client';

import useQuery from '@/hooks/useQuery';
import { Category } from '@/fetcher/interfaces/product/Product';

interface GetProductListRequest {
  search?: string
  pageNumber: number
  size: number
}

export function useCategoryList(params: GetProductListRequest, initState?: Category[]) {
  return useQuery<Category[]>({
    url: '/api/category/list',
    params,
    initState,
  });
}
