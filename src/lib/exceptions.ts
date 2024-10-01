export class AuthRequiredError extends Error {
	constructor(
		message = "Você não tem permissão para acessar essa página",
		cause: { statusCode: number } = { statusCode: 403 },
	) {
		super(message)
		this.name = "AuthRequiredError"
		this.cause = cause
	}
}
