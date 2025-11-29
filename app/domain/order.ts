export type OrderStatus = 'pending' | 'paid' | 'canceled'

export type CreateOrderDto = {
  customerName: string
  email: string
  cpf: string
  phone: string
  productName: string
  amount: number // em centavos
  address: string
}

export type Order = {
  orderId: string
  status: OrderStatus
  pix?: {
    txid?: string
    copyPasteKey: string
    expiresAt: string
  } | null
}
