import { queryOptions, useQuery } from "@tanstack/react-query"
import { eventsList } from "../mock-data"

export const getEventsOptions = queryOptions({
	queryKey: ["events"],
	queryFn: async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
		return eventsList
	},
})
export const useGetEvents = () => {
	return useQuery({
		...getEventsOptions,
	})
}
