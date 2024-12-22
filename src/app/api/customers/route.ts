import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IClient, IClientCreate } from "@/types/Asaas/Customer"
import type { IErrorAsaas } from "@/types/Asaas/Error"
import type { IPaginationAsaas } from "@/types/Asaas/Pagination"
import { type NextRequest, NextResponse } from "next/server"
import { AxiosError } from "axios"

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const cpf = searchParams.get("cpf")
	try {
		const { data } = await asaasGateway.get<IPaginationAsaas<IClient>>(
			`/customers?cpfCnpj=${cpf}`,
		)
		return NextResponse.json(data, { status: 200 })
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				error.response?.data.errors.map((i: IErrorAsaas) => i.description),
			)
		}
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const dataValiding: IClientCreate = await req.json()
	try {
		const { data } = await asaasGateway.post<IClient>("/customers", dataValiding)
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
