import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IErrorAsaas, IResponseErrorAsaas } from "@/models/error.model"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/models/payment.model"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const dataValiding = (await req.json()) as IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard

	try {
		const { data } = await asaasGateway.post<IPayment>("/payments", dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: unknown) {
		console.log(error, "error")
		return NextResponse.json(
			(error as IResponseErrorAsaas).response.data.errors.map(
				(i: IErrorAsaas) => i.description,
			),
		)
	}
}
