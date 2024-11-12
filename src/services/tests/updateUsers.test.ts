import { updateUser } from "@/actions/auth/updateUser"
import { db } from "@/lib/firebase/firebase-admin"

// Mock da função db
jest.mock("@/lib/firebase/firebase-admin", () => ({
	db: {
		collection: jest.fn(() => ({
			doc: jest.fn(() => ({
				update: jest.fn(),
			})),
		})),
	},
}))

// Mock do console.error
console.error = jest.fn()

describe("updateUser", () => {
	const userId = "testUserId"
	const updatedData = {
		name: "Nome Atualizado",
		email: "atualizado@example.com",
	}

	beforeEach(() => {
		// Limpa todos os mocks antes de cada teste
		jest.clearAllMocks()
	})

	it("should update a user successfully", async () => {
		// Obtemos a referência ao mock do update
		const updateMock = db.collection("users").doc(userId).update as jest.Mock

		// Simula um retorno bem-sucedido para a atualização
		updateMock.mockResolvedValueOnce(undefined)

		await updateUser(userId, updatedData)

		// Verificações
		expect(db.collection).toHaveBeenCalledWith("users")
		expect(db.collection("users").doc).toHaveBeenCalledWith(userId)
		expect(updateMock).toHaveBeenCalledWith(updatedData) // Verifica se update foi chamado com os dados corretos
		console.log("Usuário atualizado com sucesso!")
	})

	it("should handle errors when updating a user", async () => {
		// Obtemos a referência ao mock do update
		const updateMock = db.collection("users").doc(userId).update as jest.Mock

		// Simula um erro para a atualização
		updateMock.mockRejectedValueOnce(new Error("Test error"))

		await updateUser(userId, updatedData)

		// Verifica se o erro foi tratado
		expect(console.error).toHaveBeenCalledWith("Erro ao atualizar usuário: ", expect.any(Error))
	})
})
