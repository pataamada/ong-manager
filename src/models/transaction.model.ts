export interface Donation {
	userId?: string
  animalId?: string
	category: Category
	value: number
	description: string
	date: string
}

export interface Expense {
	userId: string
	category: Category
	value: number
	description: string
	proof: string[]
	date: string
}

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
