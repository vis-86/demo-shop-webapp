'use client';

import useMutation from '@/hooks/useMutation';
import { ProductInCart, ResultResponse } from '../interfaces';

interface CreateOrderRequest {
  products: ProductInCart[]
  comment?: string
}

export function useSavePreOrder() {
  return useMutation<CreateOrderRequest, ResultResponse>({
    url: '/api/order/pre/save',
  });
}
