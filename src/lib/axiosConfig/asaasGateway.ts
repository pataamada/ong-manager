import axios from "axios"

export const LINE_LIMIT = 10

export const asaasGateway = axios.create({
	baseURL: "https://sandbox.asaas.com/api/v3/",
	headers: {
		access_token: `$${process.env.ASAAS_KEY}==`,
		"Content-Type": "application/json",
	},
})
