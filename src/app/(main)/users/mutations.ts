import { createUser } from "@/actions/auth/user/create"
import { deleteAction } from "@/actions/auth/user/delete"
import { getAllUsers } from "@/actions/auth/user/get"
import { browserQueryClient } from "@/lib/query/get-query-client"
import { UserRoles, type UserWOutPassword } from "@/models/user.model"
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const getUsersOptions = queryOptions({
	queryKey: ["users"],
	queryFn: async () => {
		const request = await getAllUsers()
		return request?.data as UserWOutPassword[]
	},
})
export const useGetUsers = (users?: UserWOutPassword[]) =>
	useQuery({
		...getUsersOptions,
		initialData: users || [],
	})

const userSchema = z.object({
	name: z.string().trim().min(4).max(255),
	email: z.string().trim().email(),
	password: z.string().trim().min(8).max(100),
	cpf: z.string().trim().length(11),
	role: z.nativeEnum(UserRoles),
})
export const useCreateUser = () => {
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async (values: typeof userSchema._type) => {
			await createUser(values)
		},
		onMutate: async ({ password, ...values }) => {
			if (!browserQueryClient) {
				return
			}
			await browserQueryClient.cancelQueries(getUsersOptions)
			const previousUsers = browserQueryClient.getQueryData(getUsersOptions.queryKey)

			if (previousUsers) {
				const newUsers = [
					...previousUsers,
					{
						...values,
						role: UserRoles.Authenticated,
						uid: "",
					},
				]
				browserQueryClient.setQueryData(getUsersOptions.queryKey, newUsers)
				return { previousUsers }
			}
		},
		onSettled: () => {
			if (browserQueryClient) {
				browserQueryClient.invalidateQueries(getUsersOptions)
			}
		}
	})
}
export const useUpdateUser = () => {
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid, role }: { uid: string; role: UserRoles }) => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			return { uid, role }
		},
		onMutate() {
			browserQueryClient?.setQueryData(["users"], oldData => {
				return oldData
			})
		},
	})
}
export const useDeleteUser = () => {
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid }: { uid: string }) => {
			await deleteAction({ uid })
		},
		onSuccess(_, variables) {
			browserQueryClient?.setQueryData<UserWOutPassword[]>(["users"], oldData => {
				return oldData?.filter(oldUser => oldUser.uid !== variables.uid)
			})
		},
	})
}
