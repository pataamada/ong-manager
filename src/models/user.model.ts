export enum UserRoles {
	Admin = "ADMIN",
	Authenticated = "AUTHENTICATED",
}
export interface User {
	name: string
	cpf: string
	role: UserRoles
	email: string
	password: string
	uid: string
	photo?: string
	address?: string | null
	birthDate?: Date | null
	phone?: string | null
}

export type UserWTempUid = User & { tempUid?: string | null }
export type UserWOutPassword = Omit<UserWTempUid, "password">
export type CreateUserPayload = Pick<User, "cpf">
export const accessPageList: Record<UserRoles, string[]> = {
	ADMIN: ["/dashboard", "/users", "/finance"],
	AUTHENTICATED: ["/animals", "/schedules"],
}
export const publicPageList = ["/login", "/register", "/forgot-password", "/"]
