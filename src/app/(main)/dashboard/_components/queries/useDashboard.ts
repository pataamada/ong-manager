import { expensesByCategoryAction } from "@/actions/dashboard/expenses-by-category"
import { expensesByMonthAction } from "@/actions/dashboard/expenses-by-month"
import { getDonationAction } from "@/actions/dashboard/get-donations"
import { getExpensesAction } from "@/actions/dashboard/get-expenses"
import { incomesAndOutcomesAction } from "@/actions/dashboard/incomes-and-outcomes"
import { useQuery } from "@tanstack/react-query"

export const useExpensesCategory = () => {
	return useQuery({
		queryKey: ["expenses-category"],
		queryFn: async () => {
			const request = await expensesByCategoryAction()
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
	})
}

export const useExpensesCounters = () => {
	return useQuery({
		queryKey: ["expenses-counters"],
		queryFn: async () => {
			const request = await expensesByMonthAction()
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
	})
}

export const useIncomesOutComes = () => {
	return useQuery({
		queryKey: ["incomes-outcomes"],
		queryFn: async () => {
			const request = await incomesAndOutcomesAction()
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
	})
}

export const useGetDonation = (limited: boolean) => {
	return useQuery({
		queryKey: ["get-donation"],
		queryFn: async () => {
			const request = await getDonationAction({ limited })
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
	})
}

export const useGetExpense = (limited: boolean) => {
	return useQuery({
		queryKey: ["get-expense"],
		queryFn: async () => {
			const request = await getExpensesAction({ limited })
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
	})
}
