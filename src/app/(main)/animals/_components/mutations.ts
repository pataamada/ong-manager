import { findAnimalAction } from "@/actions/animal/findAnimals"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AnimalSex, AnimalType, type Animal } from "@/models/animal.model"
import { saveAnimalAction } from "@/actions/animal/saveAnimal"
import { z } from "zod"
import type { Timestamp } from "firebase/firestore"
import { deleteAnimalAction } from "@/actions/animal/deleteAnimal"
import type { Toast } from "@/hooks/use-toast"
import { updateAnimalAction } from "@/actions/animal/updateAnimal"

export const getAnimalsOptions = queryOptions({
	queryKey: ["animals"],
	queryFn: async () => {
		const request = await findAnimalAction()
		if (request?.serverError) {
			return Promise.reject(request.serverError)
		}
		if (request?.validationErrors) {
			return Promise.reject(request.validationErrors)
		}
		return request?.data ? (JSON.parse(request?.data) as Animal[]) : []
	},
})

export const useGetAnimals = () => {
	return useQuery({
		...getAnimalsOptions,
	})
}

const createAnimalSchema = z.object({
	name: z.string(),
	age: z.number(),
	type: z.nativeEnum(AnimalType),
	sex: z.nativeEnum(AnimalSex),
	observations: z.string(),
	avaliable: z.boolean(),
	castration: z.boolean(),
	updatedBy: z.string(),
	photo: z.instanceof(File).optional(),
})

const updateAnimalSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	age: z.number().optional(),
	type: z.nativeEnum(AnimalType).optional(),
	sex: z.nativeEnum(AnimalSex).optional(),
	observations: z.string().optional(),
	avaliable: z.boolean().optional(),
	castration: z.boolean().optional(),
	updatedBy: z.string(),
	photo: z.instanceof(File).optional(),
})

export const useCreateAnimal = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["create-animal"],
		mutationFn: async ({ photo, ...data }: typeof createAnimalSchema._type) => {
			const formData = new FormData()
			if (photo) {
				formData.append("file", photo)
			}
			const request = await saveAnimalAction(data, formData)
			if (request?.bindArgsValidationErrors) {
				return Promise.reject(request.bindArgsValidationErrors)
			}
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
			const parsedData = JSON.parse(data) as {
				id: string
				photo: string
				createdAt: Timestamp
				updatedAt: Timestamp
				updatedBy: string
			}
			await queryClient.cancelQueries(getAnimalsOptions)
			const previousAnimals = queryClient.getQueryData(getAnimalsOptions.queryKey)
			const animal: Animal = {
				...variables,
				id: parsedData.id,
				photo: parsedData.photo,
				createdAt: parsedData.createdAt,
				updatedAt: parsedData.updatedAt,
				updatedBy: parsedData.updatedBy,
			}
			if (previousAnimals) {
				const newAnimals: Animal[] = [animal, ...previousAnimals]
				queryClient.setQueryData(getAnimalsOptions.queryKey, newAnimals)
			}
		},
	})
}

export const useDeleteAnimal = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["delete-animal"],
		mutationFn: async (id: string) => {
			const request = await deleteAnimalAction({ animalId: id })
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data || []
		},
		onSuccess: async (_, id) => {
			toast?.({
				description: "Animal excluído com sucesso!",
			})
			await queryClient.cancelQueries(getAnimalsOptions)
			const previousAnimals = queryClient.getQueryData(getAnimalsOptions.queryKey)
			if (previousAnimals) {
				const newAnimals = previousAnimals.filter((animal: Animal) => animal.id !== id)
				queryClient.setQueryData(getAnimalsOptions.queryKey, newAnimals)
			}
		},
		onError: () => {
			toast?.({
				description: "Erro ao excluir animal!",
				variant: "destructive",
			})
			queryClient.invalidateQueries(getAnimalsOptions)
		},
	})
}

export const useUpdateAnimal = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["update-animal"],
		mutationFn: async ({ photo, ...data }: typeof updateAnimalSchema._type) => {
			const formData = new FormData()
			if (photo instanceof File) {
				formData.append("file", photo)
			}
			const request = await updateAnimalAction(data, formData)
			if (request?.serverError) {
				return Promise.reject(request.serverError)
			}
			if (request?.validationErrors) {
				return Promise.reject(request.validationErrors)
			}
			return request?.data
		},
		onSuccess: async (_, variables) => {
			await queryClient.cancelQueries(getAnimalsOptions)
			const previousAnimals = queryClient.getQueryData(getAnimalsOptions.queryKey)

			if (previousAnimals) {
				const newsAnimals = previousAnimals.map((animal: Animal) => {
					if (animal.id === variables.id) {
						return {
							...animal,
							name: variables?.name || animal.name,
							age: variables?.age || animal.age,
							type: variables?.type || animal.type,
							sex: variables?.sex || animal.sex,
							observations: variables?.observations || animal.observations,
							avaliable:
								variables?.avaliable !== undefined
									? variables.avaliable
									: animal.avaliable,
							castration:
								variables?.castration !== undefined
									? variables.castration
									: animal.castration,
							updatedBy: variables?.updatedBy || animal.updatedBy,
						}
					}
					return animal
				})
				queryClient.setQueryData(getAnimalsOptions.queryKey, newsAnimals)
			}
		},
	})
}
