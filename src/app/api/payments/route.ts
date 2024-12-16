import { asaasGateway } from '@/lib/axiosConfig/asaasGateway'
import { IErrorAsaas } from '@/types/Asaas/Error'
import { IPayment, IPaymentCreateBoletoOrPix, IPaymentCreateCreditCard } from '@/types/Asaas/Payment'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(
  req: NextRequest
) {
  const dataValiding = await req.json() as IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard
  const urlRelative = `/payments`

  try {
    const { data } = await asaasGateway.post<IPayment>(urlRelative, dataValiding)
    return NextResponse.json(data, { status: 201 })
  } catch (error:any) {
    console.log(error, 'error')
    console.log(error.response.data.errors, 'error.response.data.errors')
    return NextResponse.json(error.response.data.errors.map((i: IErrorAsaas) => i.description))
  }
}