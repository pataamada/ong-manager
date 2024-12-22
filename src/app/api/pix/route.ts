import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import type { IErrorAsaas } from "@/types/Asaas/Error"
import type { IPixPaginate } from "@/types/Asaas/Pix"
import { AxiosError } from "axios"
import { NextResponse } from "next/server"

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
