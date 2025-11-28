import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Check, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { toast } from '../hooks/use-toast'

interface PixResultProps {
  pixData: {
    qrCode: string
    pixKey: string
  }
  onBack: () => void
}

export const PixResult = ({ pixData, onBack }: PixResultProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixData.pixKey)
      setCopied(true)
      toast({
        title: 'PIX copia e cola copiado com sucesso!',
        description:
          'Cole no aplicativo do seu banco para realizar o pagamento.',
        variant: 'default',
        className: 'bg-success text-success-foreground',
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar a chave PIX. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl font-bold">
            Cobrança PIX Gerada
          </CardTitle>
          <CardDescription className="text-center">
            Use o QR Code ou a chave PIX abaixo para realizar o pagamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <QRCodeSVG
                value={pixData.qrCode}
                size={256}
                level="M"
                includeMargin={true}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-muted-foreground text-center text-sm font-medium">
                PIX Copia e Cola
              </p>
              <div className="relative">
                <div className="bg-muted border-border rounded-lg border p-4 font-mono text-sm break-all">
                  {pixData.pixKey}
                </div>
              </div>
            </div>

            <Button
              onClick={handleCopy}
              className="h-12 w-full text-base font-semibold"
              variant={copied ? 'default' : 'default'}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  Copiar PIX Copia e Cola
                </>
              )}
            </Button>

            <Button
              onClick={onBack}
              variant="outline"
              className="h-12 w-full text-base"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
          </div>

          <div className="bg-muted border-border rounded-lg border p-4">
            <p className="text-muted-foreground text-center text-sm">
              <strong>Instruções:</strong> Abra o aplicativo do seu banco,
              selecione a opção PIX, escolha &quot;Pix Copia e Cola&quot; ou
              leia o QR Code para realizar o pagamento.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
