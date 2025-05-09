export interface IDonation {
	transactionType: ETransactionTypeDonation
	saveDonationMethod: ESaveDonationMethod
	animalId?: string
	userName?: string
	userCpfCnpj?: string
	category: string
	value: number
	description: string
	date: string
}

export enum ESaveDonationMethod {
	Manual = "manual",
	System = "system",
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

export enum ETransactionTypeDonation {
	Donation = "donation",
}
