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
	photo: string
	birthDate: Date
	phone: string
}

export type UserWOutPassword = Omit<User, "password">
export type CreateUserPayload = Pick<User, "cpf">
export const accessPageList: Record<UserRoles, string[]> = {
	ADMIN: ['/dashboard', '/users','/finance'],
	AUTHENTICATED: ['/animals', '/schedules'],
}
export const publicPageList = ["/login", "/register", "/forgot-password"]