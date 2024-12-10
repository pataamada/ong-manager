"use server"
import { actionClient } from "@/actions/safe-action"
import { findAll } from "@/services/user.service"

export const getAllUsers = actionClient.action(async () => {
	return await findAll()
})
