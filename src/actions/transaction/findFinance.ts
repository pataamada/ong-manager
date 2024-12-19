"use server"
import { actionClient } from "@/actions/safe-action"
import { getDonations, getExpenses } from "@/services/finance.service"

export const findDonationsAction = actionClient.action(async () => {
	return await getDonations()
})

export const findExpensesAction = actionClient.action(async () => {
	return await getExpenses()
})
