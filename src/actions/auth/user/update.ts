"use server"
import { actionClient } from "@/actions/safe-action"
import { UserRoles } from "@/models/user.model"
import { updateUser as updateUserService } from "@/services/user.service"
import { z } from "zod"

const schema = z.object({
	uid: z.string(),
	name: z.string().trim().min(4).max(255).optional(),
	address: z.string().trim().min(4).max(512).optional(),
	email: z.string().trim().email().optional(),
	password: z.string().trim().min(8).max(100).optional(),
	cpf: z.string().trim().length(11).optional(),
	role: z.nativeEnum(UserRoles).optional(),
})

export const updateUser = actionClient.schema(schema).action(async ({ parsedInput: params }) => {
	await updateUserService(params)
})
