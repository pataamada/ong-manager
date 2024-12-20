import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IClient, IClientCreate } from "@/types/Asaas/Customer"
import type { IErrorAsaas } from "@/types/Asaas/Error"
import type { IPaginationAsaas } from "@/types/Asaas/Pagination"
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

	const urlRelative = "/customers"
	try {
		const { data } = await asaasGateway.post<IClient>(urlRelative, dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: any) {
		console.log(error, "error")
		return NextResponse.json(error.response.data.errors.map((i: IErrorAsaas) => i.description))
	}
}
