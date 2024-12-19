export interface IDonation {
	transactionType: transactionType
	animalId?: string
	userName?: string
	userCpfCnpj?: string
	category: string
	value: number
	description: string
	// proof: string[]
	date: string
}

export interface IExpense {
	transactionType: transactionType
	// userId: string
	category: string
	value: number
	description: string
	// proof: string[]
	date: string
}

type transactionType = "donation" | "expense"

export enum Category {
	Aluguel = "aluguel",
	Energia = "energia",
	Agua = "agua",
	Limpeza = "limpeza",
	Racao = "racao",
	Brinquedos = "brinquedos",
	Vacina = "vacina",
	Castracao = "castracao",
	Exames = "exames",
	Remedios = "remedios",
	Salario = "salario",
	Gas = "gas",
	Internet = "internet",
	Manutencao = "manutencao",
}
