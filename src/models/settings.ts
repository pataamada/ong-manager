export interface SettingsModel {
	id: string
	adoption?: {
		method: "whatsapp" | "instagram"
		whatsapp?: string
		instagram?: string
	}
	paymentMethod?: {
		isUsingAsaas?: boolean,
		qrCode?: string | null
	}
}