import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { useState } from 'react'
import { PixResult } from './PixResult'
import { toast } from '../hooks/use-toast'

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  return digit === parseInt(cpf.charAt(10))
}

const formSchema = z.object({
  customerName: z
    .string()
    .trim()
    .nonempty({ message: 'Nome é obrigatório' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  email: z
    .string()
    .trim()
    .email({ message: 'E-mail inválido' })
    .max(255, { message: 'E-mail deve ter no máximo 255 caracteres' }),
  cpf: z
    .string()
    .trim()
    .nonempty({ message: 'CPF é obrigatório' })
    .refine((val) => validateCPF(val), { message: 'CPF inválido' }),
  productName: z
    .string()
    .trim()
    .nonempty({ message: 'Nome do produto é obrigatório' })
    .max(100, { message: 'Nome do produto deve ter no máximo 100 caracteres' }),
  productValue: z
    .string()
    .trim()
    .nonempty({ message: 'Valor do produto é obrigatório' })
    .refine(
      (val) => {
        const normalized = val.replace(',', '.')
        const num = parseFloat(normalized)
        return !isNaN(num) && num > 0 && num <= 100
      },
      { message: 'Valor deve ser entre R$ 0,01 e R$ 100,00' },
    ),
  phone: z
    .string()
    .trim()
    .nonempty({ message: 'Telefone é obrigatório' })
    .min(10, { message: 'Telefone inválido' }),
  address: z
    .string()
    .trim()
    .nonempty({ message: 'Endereço é obrigatório' })
    .max(500, { message: 'Endereço deve ter no máximo 500 caracteres' }),
})

type FormData = z.infer<typeof formSchema>

interface PixData {
  qrCode: string
  pixKey: string
}

export const PixChargeForm = () => {
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, '')
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14)
  }

  const formatPhone = (value: string) => {
    const phone = value.replace(/\D/g, '')
    if (phone.length <= 10) {
      return phone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 14)
    }
    return phone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const amount = parseFloat(numbers) / 100
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const onSubmit = async () => {
    setIsLoading(true)

    try {
      // Aqui você fará a chamada para o backend
      // Por enquanto, simulando uma resposta
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulação de resposta do backend
      const mockPixData: PixData = {
        qrCode:
          '00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff6b2e6fa5204000053039865802BR5913NOME EMPRESA6009SAO PAULO62070503***63041D3D',
        pixKey:
          '00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff6b2e6fa5204000053039865802BR5913NOME EMPRESA6009SAO PAULO62070503***63041D3D',
      }

      setPixData(mockPixData)
      toast({
        title: 'Cobrança gerada com sucesso!',
        description: 'Use o QR Code ou a chave PIX para realizar o pagamento.',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao gerar cobrança',
        description: 'Não foi possível gerar a cobrança PIX. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (pixData) {
    return <PixResult pixData={pixData} onBack={() => setPixData(null)} />
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl font-bold">
            Gerar Cobrança PIX
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para gerar uma cobrança via PIX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nome do Cliente *</Label>
                <Input
                  id="customerName"
                  placeholder="João da Silva"
                  {...register('customerName')}
                  className={errors.customerName ? 'border-destructive' : ''}
                />
                {errors.customerName && (
                  <p className="text-destructive text-sm">
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@exemplo.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register('cpf')}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value)
                    setValue('cpf', formatted)
                  }}
                  className={errors.cpf ? 'border-destructive' : ''}
                />
                {errors.cpf && (
                  <p className="text-destructive text-sm">
                    {errors.cpf.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register('phone')}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    setValue('phone', formatted)
                  }}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="productName">Nome do Produto *</Label>
                <Input
                  id="productName"
                  placeholder="Nome do produto"
                  {...register('productName')}
                  className={errors.productName ? 'border-destructive' : ''}
                />
                {errors.productName && (
                  <p className="text-destructive text-sm">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="productValue">
                  Valor do Produto (máx. R$ 100,00) *
                </Label>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    R$
                  </span>
                  <Input
                    id="productValue"
                    placeholder="0,00"
                    {...register('productValue')}
                    onChange={(e) => {
                      const formatted = formatCurrency(e.target.value)
                      setValue('productValue', formatted)
                    }}
                    className={`pl-10 ${errors.productValue ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.productValue && (
                  <p className="text-destructive text-sm">
                    {errors.productValue.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo *</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                {...register('address')}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-destructive text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Gerando cobrança...' : 'GERAR COBRANÇA'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
