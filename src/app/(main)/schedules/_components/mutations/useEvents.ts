import { createEventAction } from "@/actions/agenda/create"
import { deleteEventAction } from "@/actions/agenda/delete"
import { findAllEventsAction } from "@/actions/agenda/find-all"
import { updateEventAction } from "@/actions/agenda/update"
import type { Toast } from "@/hooks/use-toast"
import type { Event } from "@/models/event.model"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { eventSchema, updateEventSchema } from "../modals/create-event/schemas"

export const getEventsOptions = queryOptions({
	queryKey: ["events"],
	queryFn: async () => {
		const request = await findAllEventsAction()
		return request?.data ? (JSON.parse(request?.data) as Event[]) : []
	},
})

export const useGetEvents = () => {
	return useQuery({
		...getEventsOptions,
	})
}

export const useCreateEvent = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["create-event"],
		mutationFn: async ({
			image,
			...data
		}: typeof eventSchema._type & { updatedBy: string }) => {
			const formData = new FormData()
			formData.append("image", image)
			const request = await createEventAction(data, formData)
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data || ""
		},
		onSuccess: async (data, variables) => {
			if (!data) {
				return
			}
			const parsedData = JSON.parse(data) as Event
			await queryClient.cancelQueries(getEventsOptions)
			const previousEvents = queryClient.getQueryData(getEventsOptions.queryKey)
			const event: Event = {
				...variables,
				date: variables.date,
				updatedBy: variables.updatedBy,
				id: parsedData.id,
				title: variables.title,
				description: variables.description,
				image: parsedData.image!,
			}
			if (previousEvents) {
				const newEvents: Event[] = [event, ...previousEvents]
				queryClient.setQueryData(getEventsOptions.queryKey, newEvents)
			}
		},
	})
}

export const useDeleteEvent = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["delete-event"],
		mutationFn: async (id: string) => {
			const request = await deleteEventAction({ id })
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data || []
		},
		onMutate: async id => {
			await queryClient.cancelQueries(getEventsOptions)
			const previousEvents = queryClient.getQueryData(getEventsOptions.queryKey)
			if (previousEvents) {
				const newEvents = previousEvents.filter((event: Event) => event.id !== id)
				queryClient.setQueryData(getEventsOptions.queryKey, newEvents)
			}
		},
		onSuccess: () => {
			toast?.({
				description: "Evento excluído com sucesso!",
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

export const useUpdateEvent = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["update-event"],
		mutationFn: async ({
			image,
			...data
		}: typeof updateEventSchema._type & {
			id: string
			updatedBy?: string
		}) => {
			const formData = new FormData()
			if (image instanceof File) {
				formData.append("image", image)
			}
			const request = await updateEventAction(data, formData)
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
			const parsedData = JSON.parse(data) as Event
			await queryClient.cancelQueries(getEventsOptions)
			const previousEvents = queryClient.getQueryData(getEventsOptions.queryKey)
			if (previousEvents) {
				const newsEvents = previousEvents.map((events: Event) => {
					if (events.id === variables.id) {
						return {
							...events,
							title: variables?.title || events?.title,
							description: variables?.description || events?.description,
							updatedBy: variables?.updatedBy || events.updatedBy,
							image: parsedData?.image || events.image,
							date: variables?.date || events.date,
						}
					}
					return events
				})
				queryClient.setQueryData(getEventsOptions.queryKey, newsEvents)
			}
		},
	})
}
