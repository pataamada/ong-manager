"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-secret";
import { revalidatePath } from "next/cache";

const schema = z.object({
  animalId: z.string(),
})

export const deleteAnimal = actionClient
  .schema(schema)
  .action(async ({ parsedInput: animalId }) => {
    const deletedAnimal = await(deleteDoc(doc(db, `animais/${animalId}`)));
    revalidatePath("/");
    return JSON.stringify(deletedAnimal);
  })