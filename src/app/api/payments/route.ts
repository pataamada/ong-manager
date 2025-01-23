import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import type { IErrorAsaas, IResponseErrorAsaas } from "@/models/error.model"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/models/payment.model"
import { UserRoles } from "@/models/user.model"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const currentUser = await getCurrentUser()

	if (currentUser?.role !== UserRoles.Admin) {
		return NextResponse.json({ error: "Acesso negado!" }, { status: 403 })
	}

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
