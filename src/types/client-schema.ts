import z from "zod";

export const envSchema = z.object({
    appId: z.string(),
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    messagingSenderId: z.string(),
    storageBucket: z.string(),
});

export const envClient = envSchema.safeParse({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
});

if (!envClient.success) {
    throw new Error(
        `Missing enviroment variables or enviroment variables type is incorrect: ${envClient.error.message}`
    );
}

export const envClientData = envClient.data;
