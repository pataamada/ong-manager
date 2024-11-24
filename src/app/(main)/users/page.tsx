import { HydrationBoundary } from "@tanstack/react-query"
import { UserList } from "./_components/user-list"
import { dehydrate } from "@tanstack/query-core"
import { getUsersOptions } from "./mutations"
import { getQueryClient } from "@/lib/query/get-query-client"

export default async function Users() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(getUsersOptions)
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UserList />
		</HydrationBoundary>
	)
}
