import { deleteNewsAction } from "@/actions/news/delete-news"
import { findNewsAction } from "@/actions/news/find-news"
import { saveNewsAction } from "@/actions/news/save-news"
import { updateNewsAction } from "@/actions/news/update-news"
import type { Toast } from "@/hooks/use-toast"
import type { News } from "@/models/news.model"
import { getNewsImage } from "@/services/news.service"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Timestamp } from "firebase/firestore"
import type { newsSchema, updateNewsSchema } from "../modals/create-news/schemas"

export const getNewsOptions = queryOptions({
	queryKey: ["news"],
	queryFn: async () => {
		const request = await findNewsAction(false)
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
			return request?.data
		},
		onSuccess: async (data, values) => {
			if (!data) {
				return
			}
			const parsedData = JSON.parse(data) as News
			await queryClient.cancelQueries(getNewsOptions)
			const photo = await getNewsImage(parsedData.id)
			const previousNews = queryClient.getQueryData(getNewsOptions.queryKey)
			const news: News = {
				...values,
				photo: photo[0][0],
				createdAt: new Timestamp(
					parsedData.createdAt.seconds,
					parsedData.createdAt.nanoseconds,
				),
				updatedAt: new Timestamp(
					parsedData.updatedAt.seconds,
					parsedData.updatedAt.nanoseconds,
				),
				updatedBy: parsedData.updatedBy,
				id: parsedData.id,
				title: values.title,
				description: values.description,
				tags: values.tags,
			}
			if (previousNews) {
				const newNews: News[] = [news, ...previousNews]
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
		onMutate: async id => {
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

export const useUpdateNews = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["update-news"],
		mutationFn: async ({
			photo,
			...data
		}: typeof updateNewsSchema._type & {
			id: string
			updatedBy?: string
			updatedAt?: Timestamp
		}) => {
			const formData = new FormData()
			if (photo instanceof File) {
				formData.append("photo", photo)
			}
			const request = await updateNewsAction(data, formData)
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
		onSuccess: async (data, variables) => {
			if (!data) {
				return
			}
			const parsedData = JSON.parse(data) as News
			await queryClient.invalidateQueries(getNewsOptions)
			const previousNews = queryClient.getQueryData(getNewsOptions.queryKey)
			if (previousNews) {
				const newNews = previousNews.map((news: News) => {
					if (news.id === variables.id) {
						return {
							...news,
							title: variables?.title || news?.title,
							description: variables?.description || news?.description,
							tags: variables.tags || news.tags,
							updatedAt: variables?.updatedAt
								? new Timestamp(
										variables.updatedAt.seconds,
										variables.updatedAt.nanoseconds,
									)
								: news.updatedAt,
							updatedBy: variables?.updatedBy || news.updatedBy,
							photo: parsedData?.photo || news.photo,
						}
					}
					return news
				})
				queryClient.setQueryData(getNewsOptions.queryKey, newNews)
			}
		},
	})
}
