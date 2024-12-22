import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IErrorAsaas } from "@/types/Asaas/Error"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/types/Asaas/Payment"
import { AxiosError } from "axios"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const dataValiding: IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard = await req.json()
	try {
		const { data } = await asaasGateway.post<IPayment>("/payments", dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				error.response?.data.errors.map((i: IErrorAsaas) => i.description),
			)
		}
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}
