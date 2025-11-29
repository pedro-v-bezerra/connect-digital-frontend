'use client'
import { OrderForm } from './components/OrderForm'
import { Toaster } from './components/ui/toaster'

export default function Page() {
  return (
    <>
      <OrderForm />
      <Toaster />
    </>
  )
}
