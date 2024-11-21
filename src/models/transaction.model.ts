export interface Donation {
	userId?: string
	animalId?: string
	category: string
	value: number
	description: string
	date: string
}

export interface Expense {
	userId: string
	category: string
	value: number
	description: string
	proof: string[]
	date: string
}

export const categories: string[] = [
	"Aluguel",
	"Energia Elétrica",
	"Água",
	"Produtos de Limpeza",
	"Ração/Suplementos",
	"Brinquedos",
	"Vacinas/Vermífugos",
	"Castração",
	"Exames/Tratamento Medico",
	"Remédios",
	"Salario",
	"Gás",
	"Internet",
	"Manutenção do espaço",
]
