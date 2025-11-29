'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

interface PaymentSuccessProps {
  orderId: string
  onBack: () => void
}

export const PaymentSuccess = ({ orderId, onBack }: PaymentSuccessProps) => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold">
            Pagamento Confirmado
          </CardTitle>
          <CardDescription className="text-center">
            Seu pagamento via PIX foi processado com sucesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-16 w-16 text-emerald-500" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-lg font-semibold text-emerald-500">
                PAGAMENTO CONFIRMADO
              </p>
              <p className="text-muted-foreground text-sm">
                ID do pedido:{' '}
                <span className="font-mono break-all">{orderId}</span>
              </p>
            </div>
          </div>

          <div className="bg-muted border-border space-y-2 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">
              Você receberá uma confirmação pelo WhatsApp.
            </p>
            <p className="text-muted-foreground text-sm">
              Agora você já pode fechar esta página com segurança ou gerar uma
              nova cobrança, se desejar.
            </p>
          </div>

          <Button
            onClick={onBack}
            className="h-12 w-full text-base font-semibold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Gerar nova cobrança
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
