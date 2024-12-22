import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IErrorAsaas } from "@/types/Asaas/Error"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/types/Asaas/Payment"
import { type NextRequest, NextResponse } from "next/server"

interface AsaasErrorResponse {
	response: {
		data: {
			errors: IErrorAsaas[]
		}
	}
}

export async function POST(req: NextRequest) {
	const dataValiding = (await req.json()) as IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard
	const urlRelative = "/payments"

	try {
		const { data } = await asaasGateway.post<IPayment>(urlRelative, dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: unknown) {
		console.log(error)
		return NextResponse.json(
			(error as AsaasErrorResponse).response.data.errors.map(
				(i: IErrorAsaas) => i.description,
			),
		)
	}
}
