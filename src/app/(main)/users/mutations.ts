import { deleteAction } from "@/actions/auth/user/delete"
import { queryClient } from "@/lib/query"
import type { UserRoles, UserWOutPassword } from "@/models/user.model"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetUsers = (users?: UserWOutPassword[]) =>
	useQuery({
		queryKey: ["users"],
		initialData: users || [],
		queryFn: async () => {
			const request = await fetch("api/users", {
				method: "GET",
			})
			const response = await request.json()
			return response.users as UserWOutPassword[]
		},
	})

export const useUpdateUser = () => {
	return useMutation({
		mutationKey: ["users"],
		mutationFn: async ({ uid, role }: { uid: string; role: UserRoles }) => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			return { uid, role }
		},
		onMutate() {
			queryClient.setQueryData(["users"], oldData => {
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
			queryClient.setQueryData<UserWOutPassword[]>(["users"], oldData => {
				return oldData?.filter(oldUser => oldUser.uid !== variables.uid)
			})
		},
	})
}
