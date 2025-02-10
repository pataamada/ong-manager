export interface IPaymentCreateBoletoOrPix {
	billingType: TBillingType
	value: number
	customer: string | undefined
	dueDate: string
}

type TBillingType = "BOLETO" | "CREDIT_CARD"

export interface IPaymentCreateCreditCard {
	billingType: TBillingType
	value: number
	customer: string
	dueDate: string
	creditCard: {
		holderName: string
		number: string
		expiryMonth: string
		expiryYear: string
		ccv: string
	}
	creditCardHolderInfo: {
		name: string
		email: string
		cpfCnpj: string
		postalCode: string
		addressNumber: string
		phone: string
	}
}

export interface IPayment {
	object: string
	id: string
	dateCreated: string
	customer: string
	paymentLink: null
	value: number
	netValue: number
	originalValue: null
	interestValue: null
	description: null
	billingType: string
	canBePaidAfterDueDate: boolean
	pixTransaction: null
	status: string
	dueDate: string
	originalDueDate: string
	paymentDate: null
	clientPaymentDate: null
	installmentNumber: null
	invoiceUrl: string
	invoiceNumber: string
	externalReference: null
	deleted: boolean
	anticipated: boolean
	anticipable: boolean
	creditDate: null
	estimatedCreditDate: null
	transactionReceiptUrl: null
	nossoNumero: string
	bankSlipUrl: string
	lastInvoiceViewedDate: null
	lastBankSlipViewedDate: null
	discount: Discount
	fine: Fine
	interest: Fine
	postalService: boolean
	custody: null
	refunds: null
}

interface Fine {
	value: number
	type: string
}

interface Discount {
	value: number
	limitDate: null
	dueDateLimitDays: number
	type: string
}
