"use client"
import type { UserRoles } from "@/models/user.model"
import type { UserRecord } from "firebase-admin/auth"
import { createContext, type Dispatch, type SetStateAction, useContext } from "react"

export type UserInfo = { user: UserRecord; role?: UserRoles }
interface AuthContextType {
	user: UserInfo | null
	setUser: Dispatch<SetStateAction<UserInfo | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within a authProvider")
	}
	return context
}
