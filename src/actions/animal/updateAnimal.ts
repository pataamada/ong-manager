"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-secret";
import { revalidatePath } from "next/cache";

const schema = z.object({
  animalId: z.string(),
  nome: z.string(),
  idade: z.string(),
  tipo: z.string(),
  sexo: z.string(),
  tamanho: z.string(),
  fotos: z.array(z.string()),
  observacoes: z.string(),
  castrado: z.string(),
  vacinas: z.array(z.string()),
  disponivel: z.string(),
  atualizadoPor: z.string(),
})

export const updateAnimal = actionClient
  .schema(schema)
  .action(async ({ parsedInput: {
    animalId,
    nome,
    idade,
    tipo,
    sexo,
    tamanho,
    fotos,
    observacoes,
    castrado,
    vacinas,
    disponivel,
    atualizadoPor
  }}) => {
    const updateDocument = await updateDoc(
      doc(db, `animais/${animalId}`),
      {
          nome: nome,
          idade: idade,
          tipo: tipo,
          sexo: sexo,
          tamanho: tamanho,
          fotos: fotos,
          observacoes: observacoes,
          castrado: castrado,
          vacinas: vacinas,
          disponivel: disponivel,
          atualizadoEm: serverTimestamp(),
          atualizadoPor: atualizadoPor,
      });
    revalidatePath("/");
    return JSON.stringify(updateDocument);
  })