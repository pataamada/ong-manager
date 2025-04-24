import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { AuthProvider } from "@/providers/auth-provider"

export async function Auth({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()
	return (
		<AuthProvider defaultUser={currentUser ? JSON.parse(JSON.stringify(currentUser)) : null}>
			{children}
		</AuthProvider>
	)
}
