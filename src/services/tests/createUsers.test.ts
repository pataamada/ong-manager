import { createUser } from "@/actions/auth/user/create"
import { db } from "@/lib/firebase/firebase-admin"
import type { User } from "@/types/user"

jest.mock("@/lib/firebase/firebase-admin", () => ({
	db: {
		collection: jest.fn().mockReturnValue({
			add: jest.fn().mockResolvedValue({ id: "mockedId" }),
		}),
	},
}))

describe("createUser", () => {
	// Mock do console.error para capturar erros nos testes
	beforeEach(() => {
		jest.spyOn(console, "error").mockImplementation(() => {})
	})

	afterEach(() => {
		jest.clearAllMocks() // Limpa os mocks após cada teste
	})

	it("should create a user successfully", async () => {
		const testUser: User = {
			id: "mockedId",
			name: "Maria da Silva",
			age: 25,
			email: "maria@example.com",
			cpf: "12345678900",
			password: "12345678",
		}

		await createUser(testUser)

		// Verifica se o método add foi chamado corretamente
		expect(db.collection).toHaveBeenCalledWith("users")
		expect(db.collection("users").add).toHaveBeenCalledWith(testUser)
	})

	it("should handle errors when creating a user", async () => {
		;(db.collection("users").add as jest.Mock).mockRejectedValue(new Error("Test error"))

		const testUser: User = {
			id: "mockedId",
			name: "Carlos da Silva",
			age: 28,
			email: "carlos@example.com",
			cpf: "98765432100",
			password: "87654321",
		}

		await createUser(testUser)

		// Verifica se o erro foi tratado corretamente
		expect(console.error).toHaveBeenCalledWith("Erro ao criar usuário: ", expect.any(Error))
	})
})
