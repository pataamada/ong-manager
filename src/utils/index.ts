import { type NextRequest, NextResponse } from "next/server"

export const PAGE_SIZES_TABLE = [10, 20, 30, 40, 50]

export const redirectTo = (
	request: NextRequest,
	to: string,
	from: string | undefined = undefined,
) => {
	const newUrl = new URL(to, request.nextUrl)
	newUrl.searchParams.delete("tab")
	if (from) newUrl.searchParams.set("from", from)
	return NextResponse.redirect(newUrl)
}
export const initialLetters = (fullname: string): string => {
	const [firstName = " ", secondName = " "] = fullname.split(/\s+/)
	return `${firstName[0]}${secondName[0]}`
}


export function validateCpf(cpf: string) {
	let sum = 0
	let remainder = 0

	cpf = cpf.replace(".", "").replace(".", "").replace("-", "").trim()

	let allEqual = true
	for (let i = 0; i < cpf.length - 1; i++) {
		if (cpf[i] !== cpf[i + 1]) allEqual = false
	}
	if (allEqual) return false

	for (let i = 1; i <= 9; i++) sum += Number.parseInt(cpf.substring(i - 1, i)) * (11 - i)
	remainder = (sum * 10) % 11

	if (remainder === 10 || remainder === 11) remainder = 0
	if (remainder !== Number.parseInt(cpf.substring(9, 10))) return false

	sum = 0
	for (let i = 1; i <= 10; i++) sum += Number.parseInt(cpf.substring(i - 1, i)) * (12 - i)
	remainder = (sum * 10) % 11

	if (remainder === 10 || remainder === 11) remainder = 0
	if (remainder !== Number.parseInt(cpf.substring(10, 11))) return false

	return true
}
