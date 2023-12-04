export interface DisplayName {
    id: number
    name: string
    description?: string
}

export interface ResultResponse {
  ok: boolean
  message: string
}

export type OrderStatus = 'NEW' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'DECLINED'