"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { deleteUser as firestoreDeleteUser } from "@/services/user.service"
import { auth } from "@/lib/firebase/firebase-admin"

const schema = z.object({
	uid: z.string(),
})

export const deleteAction = actionClient.schema(schema).action(async ({ parsedInput: { uid } }) => {
	await auth.deleteUser(uid)
	await firestoreDeleteUser(uid)
})
