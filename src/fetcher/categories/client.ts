'use client';

import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import { Category } from '@/fetcher/interfaces/product/Product';
import { ResultResponse } from '../interfaces';

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
  return useMutation<Category, ResultResponse>({
    url: '/api/category/save',
  });
}
