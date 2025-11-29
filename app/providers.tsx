'use client'

import { ReactNode } from 'react'
import { OrdersProvider } from './context/OrdersContext'

export function Providers({ children }: { children: ReactNode }) {
  return <OrdersProvider>{children}</OrdersProvider>
}
