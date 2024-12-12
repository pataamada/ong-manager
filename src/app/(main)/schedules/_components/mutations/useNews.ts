import { queryOptions, useQuery } from "@tanstack/react-query";
import { newsList } from "../mock-data";


export const getNewsOptions = queryOptions({
	queryKey: ["news"],
	queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
		return newsList	
	},
})
export const useGetNews = () => {
	return useQuery({
		...getNewsOptions,
	})
}