import { createUser } from "@/actions/auth/user/create"
import { deleteAction } from "@/actions/auth/user/delete"
import { getAllUsers } from "@/actions/auth/user/get"
import { updateUser } from "@/actions/auth/user/update"
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
})
export const useCreateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async (values: typeof userSchema._type) => {
			const request = await createUser(values)
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
				return { previousUsers }
			}
		},
		onSettled: (data) => {
			if (!data) {
				return
			}
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)
			const newUsers = previousUsers?.map(user => ({
				...user,
				uid: data.uid,
			}))
			queryClient.setQueryData(getUsersOptions.queryKey, newUsers)
		},
	})
}
export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid, name }: { uid: string; name: string }) => {
			await updateUser({ uid, name })
		},
		onMutate: async ({ name, uid }) => {
			await queryClient.cancelQueries(getUsersOptions)
			const previousUsers = queryClient.getQueryData(getUsersOptions.queryKey)

			if (previousUsers) {
				const newUsers = previousUsers.map(user => {
					if (user.uid === uid) {
						return {
							...user,
							name,
						}
					}
					return user
				})
				queryClient.setQueryData(getUsersOptions.queryKey, newUsers)
				return { previousUsers }
			}
		},
	})
}
export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid }: { uid: string }) => {
			await deleteAction({ uid })
		},
		onSuccess(_, variables) {
			queryClient?.setQueryData<UserWOutPassword[]>(["users"], oldData => {
				return oldData?.filter(oldUser => oldUser.uid !== variables.uid)
			})
		},
	})
}
