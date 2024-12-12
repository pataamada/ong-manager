"use server"
import { findRecentAnimals } from "@/services/animal.service"
import { actionClient } from "../safe-action"

export const recentAnimalsAction = actionClient.action(async () => {
	const animals = await findRecentAnimals()
	return JSON.stringify(animals)
})
