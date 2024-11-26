import { asaasGateway } from '@/lib/axiosConfig/asaasGateway'
import type { IErrorAsaas } from '@/types/Asaas/Error'
import type { IPayment, IPaymentCreateBoletoOrPix, IPaymentCreateCreditCard } from '@/types/Asaas/Payment'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
) {
  const dataValiding = await req.json() as IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard
  const urlRelative = `/payments`

  try {
    const { data } = await asaasGateway.post<IPayment>(urlRelative, dataValiding)
    return NextResponse.json(data, { status: 201 })
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error:any) {
    console.log(error, 'error')
    return NextResponse.json(error.response.data.errors.map((i: IErrorAsaas) => i.description))
  }
}