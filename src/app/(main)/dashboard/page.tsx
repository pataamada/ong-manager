import { getCurrentUser } from "@/lib/firebase/firebase-admin"

export default async function Dashboard() {
	const currentUser = await getCurrentUser()
	return (
		<div className="flex flex-col">
			<span>{currentUser?.user.email}</span>
		</div>
	)
}
