/* eslint-disable @typescript-eslint/no-namespace */
import type { z } from "zod"
import type { envSchema } from "./env-schema"

type EnvSchemaType = z.infer<typeof envSchema>

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	// biome-ignore lint/style/useNamingConvention: <explanation>
	namespace NodeJS {
		interface ProcessEnv extends EnvSchemaType {}
	}
}
