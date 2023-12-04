'use client';

import useMutation from '@/hooks/useMutation';
import { OrderStatus, ProductInCart } from '../interfaces';

interface UpdateOrderRequest {
  products: ProductInCart[]
  orderId?: number
  comment?: string
  status?: OrderStatus,
  payMethodId?: number
  deliveryTypeId?: number
}

interface CreateOrderRequest {
  comment?: string
  status: OrderStatus,
  payMethodId?: number
  deliveryTypeId: number
}

export function useSaveOrder() {
  return useMutation<UpdateOrderRequest, number>({
    url: '/api/bot/order/update',
  });
}

export function useCreateOrder() {
  return useMutation<CreateOrderRequest, number>({
    url: '/api/bot/order/create',
  });
}
