import { Sidebar } from "@/components/sidebar/index"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import type { ReactNode } from "react"

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const currentUser = await getCurrentUser()
	return (
		<main className="grid grid-cols-[auto_1fr] bg-zinc-100 min-h-full">
			<Sidebar currentUser={JSON.parse(JSON.stringify(currentUser))} />
			<section className="p-6">{children}</section>
		</main>
	)
}
