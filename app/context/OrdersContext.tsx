'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { CreateOrderDto, Order, OrderStatus } from '../domain/order'

type OrdersContextValue = {
  order: Order | null
  loading: boolean
  createOrder: (payload: CreateOrderDto) => Promise<void>
  refreshStatus: () => Promise<void>
  clearOrder: () => void
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined)

type OrdersProviderProps = {
  children: ReactNode
}

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)

  const createOrder = async (payload: CreateOrderDto) => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Erro ao criar pedido')
      }

      const data = (await res.json()) as Order
      setOrder(data)
    } finally {
      setLoading(false)
    }
  }

  const orderId = order?.orderId

  const refreshStatus = useCallback(async () => {
    if (!orderId) {
      return
    }

    const res = await fetch(`/api/orders/${orderId}`)
    if (!res.ok) {
      return
    }

    const raw = (await res.json()) as {
      orderId: string
      status: string
      expiresAt: string
    }

    const mapStatus = (status: string): OrderStatus => {
      switch (status) {
        case 'PAID':
          return 'paid'
        case 'PENDING':
          return 'pending'
        case 'CANCELED':
          return 'canceled'
        default:
          return 'pending'
      }
    }

    setOrder((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        status: mapStatus(raw.status),
        pix: prev.pix
          ? {
              ...prev.pix,
              expiresAt: raw.expiresAt,
            }
          : prev.pix,
      }
    })
  }, [orderId])

  const clearOrder = () => setOrder(null)

  useEffect(() => {
    if (!orderId || order?.status !== 'pending') {
      return
    }

    const interval = setInterval(() => {
      refreshStatus()
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId, order?.status, refreshStatus])

  return (
    <OrdersContext.Provider
      value={{ order, loading, createOrder, refreshStatus, clearOrder }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) {
    throw new Error('useOrders deve ser usado dentro de OrdersProvider')
  }
  return ctx
}
