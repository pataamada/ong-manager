import { cookies } from "next/headers";

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function getSession() {
    try {
        return cookies().get("__session")?.value;
    } catch (error) {
        return undefined;
    }
}
