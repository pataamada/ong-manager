"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string; cause: { statusCode: number } }
	reset: () => void
}) {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<h2 className="text-center">{error.message}</h2>
			<p className="text-center">{error.cause?.statusCode}</p>
			<Button
				onClick={
					// Attempt to recover by trying to re-render the invoices route
					() => reset()
				}
			>
				Try again
			</Button>
		</main>
	)
}
