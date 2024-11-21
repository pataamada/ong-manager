import { QueryClient, defaultShouldDehydrateQuery, isServer } from "@tanstack/react-query"
export let browserQueryClient: QueryClient | undefined = undefined

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			dehydrate: {
				shouldDehydrateQuery: query =>
					defaultShouldDehydrateQuery(query) || query.state.status === "pending",
			},
		},
	})
}


export function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient()
	}

	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}
