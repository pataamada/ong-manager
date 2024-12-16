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
	phone: string | null // todo: adicionar
}

export type UserWTempUid = User & { tempUid?: string | null }
export type UserWOutPassword = Omit<UserWTempUid, "password">
export type CreateUserPayload = Partial<User>
export const accessPageList: Record<UserRoles, string[]> = {
	ADMIN: ["/dashboard", "/users", "/finance"],
	AUTHENTICATED: ["/animals", "/schedules"],
}
export const publicPageList = ["/login", "/register", "/forgot-password"]
