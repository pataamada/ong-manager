import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IClient, IClientCreate } from "@/models/customer.model"
import type { IErrorAsaas, IResponseErrorAsaas } from "@/models/error.model"
import type { IPaginationAsaas } from "@/models/pagination.model"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const cpf = searchParams.get("cpf")
	console.log("searchparams", searchParams)

	const urlRelative = `/customers?cpfCnpj=${cpf}`
	try {
		const { data } = await asaasGateway.get<IPaginationAsaas<IClient>>(urlRelative)

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error, "error")
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const dataValiding = (await req.json()) as IClientCreate

	try {
		const { data } = await asaasGateway.post<IClient>("/customers", dataValiding)
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
