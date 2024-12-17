import type { FieldValue } from "firebase/firestore"

export interface IDonation {
	transactionType: transactionType
	animalId?: string
	userName?: string
	userCpfCnpj?: string
	category: Category
	value: number
	description: string
	proof: string[]
	date: FieldValue
}

export interface IExpense {
	transactionType: transactionType
	userId: string
	category: Category
	value: number
	description: string
	proof: string[]
	date: FieldValue
}

type transactionType = "donation" | "expense"

export enum Category {
	Aluguel = "Aluguel",
	"Energia Eletrica" = "Energia Elétrica",
  Agua = "Água",
  "Produtos de Limpeza" = "Produtos de Limpeza",
  "Racao/Suplementos" = "Ração/Suplementos",
  Brinquedos = "Brinquedos",
  "Vacinas/Vermifugos" = "Vacinas/Vermífugos",
  Castracao = "Castração",
  "Exames/TratamentoMedico" = "Exames/Tratamento Medico",
  Remedios = "Remédios",
  Salario = "Salario",
  Gas = "Gás",
  Internet = "Internet",
  "Manutencao do Espaco" = "Manutenção do espaço",
}
