"use server"
import { actionClient } from "@/actions/safe-action"
import { z } from "zod"

import { auth } from "@/lib/firebase/firebase-admin"
import { deleteUser as firestoreDeleteUser } from "@/services/user.service"

const schema = z.object({
	uid: z.string(),
})

export const deleteAction = actionClient.schema(schema).action(async ({ parsedInput: { uid } }) => {
	await auth.deleteUser(uid)
	await firestoreDeleteUser(uid)
})
