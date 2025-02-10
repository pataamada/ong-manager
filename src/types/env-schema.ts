import z from "zod"

export const envSchema = z.object({
	appId: z.string(),
	apiKey: z.string(),
	authDomain: z.string(),
	projectId: z.string(),
	messagingSenderId: z.string(),
	storageBucket: z.string(),
	firebaseAdminClientEmail: z.string(),
	firebaseAdminProjectId: z.string(),
	firebaseAdminPrivateKey: z.string(),
	asaasKey: z.string(),
	jwtSecretKey: z.string(),
	jwtTokenVerify: z.string(),
})

export const envServer = envSchema.safeParse({
	appId: process.env.NEXT_PUBLIC_APP_ID,
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	firebaseAdminClientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
	firebaseAdminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
	firebaseAdminPrivateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
	asaasKey: process.env.ASAAS_KEY,
	jwtSecretKey: process.env.JWT_SECRET_KEY,
	jwtTokenVerify: process.env.JWT_TOKEN_VERIFY,
})

if (!envServer.success) {
	throw new Error(
		`Missing enviroment variables or enviroment variables type is incorrect: ${envServer.error.message}`,
	)
}

export const envServerData = envServer.data
