import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { findNewsAction } from "@/actions/news/find-news";
import type { newsSchema } from "../modals/create-news/news-form-schema";
import { saveNewsAction } from "@/actions/news/save-news";


export const getNewsOptions = queryOptions({
	queryKey: ["news"],
	queryFn: async () => {
        const request = await findNewsAction()
		return request?.data || []
	},
})
export const useGetNews = () => {
	return useQuery({
		...getNewsOptions,
	})
}

export const useCreateNews = () => {
	return useMutation({
		mutationKey: ["create-news"],
		mutationFn: async (data: typeof newsSchema._type & { file: File; updatedBy: string }) => {
			const formData = new FormData()
			formData.append("photo", data.file)
			const request = await saveNewsAction(data, formData)
			if(request?.serverError){
				return Promise.reject(request.serverError)
			}
			if(request?.validationErrors){
				return Promise.reject(request.validationErrors)
			}
			return request?.data || []
		},
	})
}