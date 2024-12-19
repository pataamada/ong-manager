"use server"
import { actionClient } from "@/actions/safe-action"
import { findAnimals } from "@/services/animal.service"

export const findAnimalAction = actionClient.action(async () => {
	const animals = await findAnimals()
	return JSON.stringify(animals)
})
