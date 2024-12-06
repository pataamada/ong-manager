import { createUser } from "@/actions/auth/user/create"
import { deleteAction } from "@/actions/auth/user/delete"
import { getAllUsers } from "@/actions/auth/user/get"
import { updateUser } from "@/actions/auth/user/update"
import type { Toast } from "@/hooks/use-toast"
import { UserRoles, type UserWOutPassword } from "@/models/user.model"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

export const getUsersOptions = queryOptions({
	queryKey: ["users"],
	queryFn: async () => {
		const request = await getAllUsers()
		return request?.data || []
	},
})
export const useGetUsers = () => {
	return useQuery({
		...getUsersOptions,
	})
}

const userSchema = z.object({
	name: z.string().trim().min(4).max(255),
	email: z.string().trim().email(),
	password: z.string().trim().min(8).max(100),
	cpf: z.string().trim().length(11),
	role: z.nativeEnum(UserRoles),
	tempUid: z.string(),
})

export const useCreateUser = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async (values: typeof userSchema._type) => {
			const request = await createUser(values)
			if (request?.serverError) {
				toast?.({
					title: "Erro ao criar usuário",
					description: request.serverError,
					variant: "destructive",
				})
				return Promise.reject(request.serverError)
			}
			return request?.data
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onMutate: async ({ password, ...values }) => {
			await queryClient.cancelQueries(getUsersOptions)
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)

			if (previousUsers) {
				const newUsers = [
					...previousUsers,
					{
						...values,
						role: UserRoles.Authenticated,
						uid: "",
					},
				]
				queryClient.setQueryData(getUsersOptions.queryKey, newUsers)
			}
		},
		onSettled: (data, _, variables) => {
			if (!data) {
				return
			}
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)
			if (previousUsers) {
				const newUsers = previousUsers.map(user => {
					if (user?.tempUid === variables.tempUid) {
						return {
							...user,
							...variables,
							uid: data.uid,
						}
					}
					return user
				})
				queryClient.setQueryData(getUsersOptions.queryKey, newUsers)
			}
		},
		onError: (_, variables) => {
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)
			if (previousUsers) {
				const updatedUsers = previousUsers.filter(user => user?.tempUid !== variables?.tempUid)
				queryClient.setQueryData(getUsersOptions.queryKey, updatedUsers)
			}
		},
		onSuccess: () => {
			toast?.({
				title: "Usuário Criado",
				description: "com sucesso!",
				variant: "default",
			})
		},
	})
}

const updateUserSchema = z.object({
	uid: z.string(),
	name: z.string().trim().min(4).max(255).optional(),
	role: z.nativeEnum(UserRoles).optional(),
	address: z.string().trim().max(512).optional(),
})
export const useUpdateUser = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async (params: typeof updateUserSchema._type) => {
			const request = await updateUser(params)
			if (request?.serverError) {
				toast?.({
					title: "Erro ao criar usuário",
					description: request.serverError,
					variant: "destructive",
				})
				return Promise.reject(request.serverError)
			}
			return request?.data
		},
		onMutate: async (variables: typeof updateUserSchema._type) => {
			await queryClient.cancelQueries(getUsersOptions)
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)
			if (previousUsers) {
				const newUsers = previousUsers.map(user => {
					if (user.uid === variables.uid) {
						return {
							...user,
							...variables,
						}
					}
					return user
				})
				queryClient.setQueryData(getUsersOptions.queryKey, newUsers)
			}
		},
		onSuccess: () => {
			toast?.({
				title: "Usuário Atualizado",
				description: "com sucesso!",
				variant: "default",
			})
		},
	})
}
export const useDeleteUser = (toast?: (params: Toast) => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid }: { uid: string }) => {
			const request = await deleteAction({ uid })
			if (request?.serverError) {
				toast?.({
					title: "Erro ao deletar usuário",
					description: request.serverError,
					variant: "destructive",
				})
				return Promise.reject(request.serverError)
			}
		},
		onSuccess(_, variables) {
			toast?.({
				title: "Usuário apagado!",
				description:"O usuário foi apagado com sucesso!",
				variant: "default",
			})
			queryClient?.setQueryData<UserWOutPassword[]>(["users"], oldData => {
				return oldData?.filter(oldUser => oldUser.uid !== variables.uid)
			})
		},
	})
}
