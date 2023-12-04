'use server';

import { serverPost } from "../ServerFetcher";
import { DisplayName } from "../interfaces";

export async function asyncDeliveryTypes() {
  return serverPost<DisplayName[]>({
    url: '/bot/dict/delivery-types'
  });
}

export async function asyncPaymentMethods() {
  return serverPost<DisplayName[]>({
    url: '/bot/dict/payment-methods'
  });
}