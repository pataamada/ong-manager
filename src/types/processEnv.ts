/* eslint-disable @typescript-eslint/no-namespace */
// biome-ignore lint/style/useImportType: <explanation>
import { z } from "zod";
import type { envSchema } from "./env-schema";

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
    // biome-ignore lint/style/noNamespace: <explanation>
    namespace NodeJS {
        interface ProcessEnv extends EnvSchemaType {}
    }
}
