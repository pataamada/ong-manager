"use server"
import { actionClient } from "@/actions/safe-action"
import { getDonations, getExpenses } from "@/services/finance.service"

export const findDonationsAction = actionClient.action(async () => {
	const donaitons = await getDonations()
	return JSON.parse(donaitons)
})

export const findExpensesAction = actionClient.action(async () => {
	const expenses = await getExpenses()
	return JSON.parse(expenses)
})
