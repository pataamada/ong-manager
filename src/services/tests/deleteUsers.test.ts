import { deleteUser } from "@/actions/auth/deleteUser"
import { db } from "@/lib/firebase/firebase-admin"

jest.mock("@/lib/firebase/firebase-admin", () => ({
	db: {
		collection: jest.fn().mockReturnValue({
			doc: jest.fn().mockReturnValue({
				delete: jest.fn().mockResolvedValue({}),
			}),
		}),
	},
}))

describe("deleteUser", () => {
	beforeEach(() => {
		jest.clearAllMocks() // Limpa os mocks antes de cada teste
	})

	it("should delete a user successfully", async () => {
		const userId = "mockedUserId"

		await deleteUser(userId)

		// Verifica se os métodos foram chamados corretamente
		expect(db.collection).toHaveBeenCalledWith("users")
		expect(db.collection("users").doc).toHaveBeenCalledWith(userId)
		expect(db.collection("users").doc(userId).delete).toHaveBeenCalled()
	})

	it("should handle errors when deleting a user", async () => {
		const userId = "mockedUserId"
		;(db.collection("users").doc(userId).delete as jest.Mock).mockRejectedValue(
			new Error("Test error"),
		)

		console.error = jest.fn()

		await deleteUser(userId)

		// Verifica se o erro foi tratado
		expect(console.error).toHaveBeenCalledWith("Erro ao apagar usuário: ", expect.any(Error))
	})
})
