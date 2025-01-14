import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IErrorAsaas } from "@/models/error.model"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/models/payment.model"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const dataValiding = (await req.json()) as IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard
	const urlRelative = "/payments"

	try {
		const { data } = await asaasGateway.post<IPayment>(urlRelative, dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: any) {
		console.log(error)
		return NextResponse.json(error.response.data.errors.map((i: IErrorAsaas) => i.description))
	}
}
