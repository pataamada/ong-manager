import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { findNewsAction } from "@/actions/news/find-news"
import type { newsSchema } from "../modals/create-news/news-form-schema"
import { saveNewsAction } from "@/actions/news/save-news"
import { deleteNewsAction } from "@/actions/news/delete-news"
import type { News } from "@/models/news.model"
import { getNewsImage } from "@/services/news.service"
import { Timestamp } from "firebase/firestore"
import type{ Toast } from "@/hooks/use-toast"

export const getNewsOptions = queryOptions({
	queryKey: ["news"],
	queryFn: async () => {
		const request = await findNewsAction()
		return request?.data ? (JSON.parse(request?.data) as News[]) : []
	},
})

export const useGetNews = () => {
	return useQuery({
		...getNewsOptions,
	})
}

export const useCreateNews = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["create-news"],
		mutationFn: async ({ photo, ...data }: typeof newsSchema._type & { updatedBy: string }) => {
			const formData = new FormData()
			formData.append("photo", photo)
			const request = await saveNewsAction(data, formData)
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data || ""
		},
		// onMutate: async (values) => {
		// 	await queryClient.cancelQueries(getNewsOptions)
		// 	const previousNews = queryClient.getQueryData(getNewsOptions.queryKey)

		// 	if (previousNews) {
		// 		const newNews: News[] = [
		// 			...previousNews,
		// 			{
		// 				...values,
		// 				photo: URL.createObjectURL(values.photo),
		// 			},
		// 		]
		// 		queryClient.setQueryData(getNewsOptions.queryKey, newNews)
		// 	}
		// 	// queryClient.invalidateQueries({ queryKey: ["news"] })
		// },
		onSuccess: async (data, values) => {
			if(!data) {
				return;
			}
			await queryClient.cancelQueries(getNewsOptions)
			const photo = await getNewsImage(data.id)
			const previousNews = queryClient.getQueryData(getNewsOptions.queryKey)
			const news: News = {
				...values,
				photo: photo[0][0],
				createdAt: new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds),
				updatedAt: new Timestamp(data.updatedAt.seconds, data.updatedAt.nanoseconds),
				updatedBy: data.updatedBy,
				id: data.id,
				title: values.title,
				description: values.description,
				tags: values.tags,
			}
			if (previousNews) {
				const newNews: News[] = [
					news,
					...previousNews,
				]
				queryClient.setQueryData(getNewsOptions.queryKey, newNews)
			}
		},
	})
}

export const useDeleteNews = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["delete-news"],
		mutationFn: async (id: string) => {
			const request = await deleteNewsAction({ id })
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data || []
		},
		onMutate: async (id) => {
			await queryClient.cancelQueries(getNewsOptions)
			const previousNews = queryClient.getQueryData(getNewsOptions.queryKey)
			if (previousNews) {
				const newNews = previousNews.filter((news: News) => news.id !== id)
				queryClient.setQueryData(getNewsOptions.queryKey, newNews)
				
			}
		},
		onSuccess: () => {
			toast?.({
				description: "Notícia excluída com sucesso!",
			})
		},
		onError: () => {
			toast?.({
				description: "Erro ao excluir noticia!",
				variant: "destructive",
			})
		},
	})
}
