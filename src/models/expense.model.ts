export interface IExpense {
	transactionType: ETransactionType
	category: string
	value: number
	description: string
	date: string
}

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

export enum ETransactionType {
  Expense = "expense"
}