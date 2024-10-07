"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { deleteAnimal } from "@/services/animal.service"

const schema = z.object({
  animalId: z.string(),
})

export const deleteAnimalAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { animalId } }) => {
    const deletedAnimal = await deleteAnimal(animalId);
    return JSON.stringify(deletedAnimal);
  })