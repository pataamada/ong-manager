import { findAll, findOne, findUserByEmailPassword } from "@/services/user.service"

export const getUser = async (id?: string, email?: string, password?: string) => {
	try {
		if (id) {
			// Busca usuário por ID
			const user = await findOne(id)
			return user ? [user] : []
		}

		if (email && password) {
			// Busca usuário por email e senha
			const user = await findUserByEmailPassword(email, password)
			return user ? [user] : []
		}

		const users = await findAll()
		return users
	} catch (error) {
		console.error("Erro ao requisitar usuários: ", error)
		throw error
	}
}
