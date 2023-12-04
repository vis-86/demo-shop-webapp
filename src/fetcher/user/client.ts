'use client';

import { handleApi } from '../ClientFetcher';
import { OrderStatus } from '../interfaces';

export interface BotProduct {
  productId: number,
  name: string,
  imgPath: string,
  description: string,
  metricName: string,
  optionId: number,
  count: number,
  price: number,
  volume: number,
  totalPrice: number,
}

export interface BotOrder {
  orderId: number,
  status: OrderStatus,
  comment?: string,
  updateDate?: Date,
  deliveryTypeId?: number,
  payMethodId?: number,
  clientComment?: string,
  clientTotalOrders?: number,
  phone?: string,
  address?: string,
  productList:  BotProduct[]
}

export interface BotClient {
  clientId: number,
  currentOrderId?: number,
  currentOrder?: BotOrder
}

export function apiWelcome() {
  return handleApi<BotClient>({
    url: '/api/bot/welcome',
  });
}