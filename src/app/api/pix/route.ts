import { saveDonationAction } from "@/actions/transaction/saveDonation"
import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import { INotificationTranferPix } from "@/models/asaas.model"
import { ESaveDonationMethod, ETransactionType } from "@/models/transaction.model"
import { IErrorAsaas } from "@/types/Asaas/Error"
import type { IPixPaginate } from "@/types/Asaas/Pix"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	const urlRelative = "/pix/addressKeys"
	try {
		const { data } = await asaasGateway.get<IPixPaginate>(urlRelative)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error, "error")
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const notification = (await req.json()) as INotificationTranferPix

	try {
		const data = {
			transactionType: ETransactionType.Donation,
			saveDonationMethod: ESaveDonationMethod.System,
			userName: notification.transfer.bankAccount.ownerName,
			userCpfCnpj: notification.transfer.bankAccount.cpfCnpj,
			animalId: "Todos",
			category: "Geral",
			value: notification.transfer.value,
			description: "Geral",
		}
		await saveDonationAction(data)

		const message = `Doação realizada por ${notification.transfer.bankAccount.ownerName} no valor de ${notification.transfer.value} reais`

		return NextResponse.json(message, { status: 201 })
	} catch (error: any) {
		console.log(error, "error")
		return NextResponse.json(error.response.data.errors.map((i: IErrorAsaas) => i.description))
	}
}
