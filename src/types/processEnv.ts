import type { z } from "zod"
import type { envSchema } from "./env-schema"

type EnvSchemaType = z.infer<typeof envSchema>

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	namespace NodeJS {
		interface ProcessEnv extends EnvSchemaType {}
	}
}
