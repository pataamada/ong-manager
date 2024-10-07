"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { deleteUser, type User } from "firebase/auth"
import { deleteUser as firestoreDeleteUser } from "@/services/user.service"

const schema = z.object({
	user: z.custom<User>(),
})

export const login = actionClient.schema(schema).action(async ({ parsedInput: { user } }) => {
	await deleteUser(user)
	await firestoreDeleteUser(user.uid)
})
