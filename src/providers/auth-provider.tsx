"use client"
import { AuthContext, type UserInfo } from "@/hooks/use-auth"
import { useState } from "react"

export const AuthProvider: React.FC<{
	defaultUser?: UserInfo | null
	children: React.ReactNode
}> = ({ defaultUser, children }) => {
	const [user, setUser] = useState<UserInfo | null>(defaultUser || null)
	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
