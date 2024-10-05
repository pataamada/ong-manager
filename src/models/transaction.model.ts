export interface IDonation {
	transactionType: transactionType
	animalId?: string
	userName?: string
	userCpfCnpj?: string
	category: Category
	value: number
	description: string
	proof: string[]
	date: string
}

export interface IExpense {
	transactionType: transactionType
	userId: string
	category: Category
	value: number
	description: string
	proof: string[]
	date: string
}

type transactionType = "donation" | "expense"

type Category =
	| "Aluguel"
	| "Energia Elétrica"
	| "Água"
	| "Produtos de Limpeza"
	| "Ração/Suplementos"
	| "Brinquedos"
	| "Vacinas/Vermífugos"
	| "Castração"
	| "Exames/Tratamento Medico"
	| "Remédios"
	| "Salario"
	| "Gás"
	| "Internet"
	| "Manutenção do espaço"
