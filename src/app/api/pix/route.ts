import { saveDonationAction } from "@/actions/transaction/saveDonation"
import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { INotificationTranferPix } from "@/models/asaas.model"
import { ESaveDonationMethod, ETransactionTypeDonation } from "@/models/donation.model"
import type { IErrorAsaas, IResponseErrorAsaas } from "@/models/error.model"
import type { IPixPaginate } from "@/models/pix.model"
import { AxiosError } from "axios"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
	try {
		const { data } = await asaasGateway.get<IPixPaginate>("/pix/addressKeys")
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				error.response?.data.errors.map((i: IErrorAsaas) => i.description),
			)
		}
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const notification = (await req.json()) as INotificationTranferPix
	const ownerName = notification.transfer.bankAccount.ownerName
	const transferValue = notification.transfer.value

	try {
		await saveDonationAction({
			transactionType: ETransactionTypeDonation.Donation,
			saveDonationMethod: ESaveDonationMethod.System,
			userName: ownerName,
			userCpfCnpj: notification.transfer.bankAccount.cpfCnpj,
			animalId: "Todos",
			category: "Geral",
			value: transferValue,
			description: "Geral",
		})

		const message = `Doação realizada por ${ownerName} no valor de R$${transferValue}`
		return NextResponse.json(message, { status: 201 })
	} catch (error: unknown) {
		console.log(error, "error")
		return NextResponse.json(
			(error as IResponseErrorAsaas).response.data.errors.map(
				(i: IErrorAsaas) => i.description,
			),
		)
	}
}
