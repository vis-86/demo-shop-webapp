import { OrderStatus, ProductInCart } from "@/fetcher/interfaces"
import { Dispatch, SetStateAction, createContext } from "react"

export interface OrderDetail {
  orderId?: number
  address?: string
  status?: OrderStatus
  comment?: string
  payMethodId?: number
  deliveryTypeId?: number
  clientAddressId?: number
}

export interface CartContextValue {
  cartIsEmpty: () => boolean
  totalAmount: () => number
  setOrder: Dispatch<SetStateAction<OrderDetail | null>>
  addProduct: (product: ProductInCart) => void
  updateProduct: (product: ProductInCart) => void
  removeProduct: (product: ProductInCart) => void
  clearProducts: () => void,
  order: OrderDetail | null
  products: ProductInCart[]
  sessionInit: boolean
  tgEnabled: boolean
  tg: WebApp | null
}

export const CartContext = createContext<CartContextValue>({
  cartIsEmpty: () => false,
  totalAmount: () => 0,
  setOrder: () => { },
  addProduct: () => { },
  updateProduct: () => { },
  removeProduct: () => { },
  clearProducts: () => { },
  order: null,
  products: [],
  sessionInit: false,
  tgEnabled: false,
  tg: null
});