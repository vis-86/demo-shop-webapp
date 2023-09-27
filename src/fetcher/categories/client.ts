'use client';

import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import { SaveResponse } from '@/fetcher/interfaces/core/SaveResponse';
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

export function useCategorySave() {
  return useMutation<Category, SaveResponse>({
    url: '/api/category/save',
  });
}
