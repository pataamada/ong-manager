"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-secret";
import { revalidatePath } from "next/cache";

export const schema = z.object({
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

export const saveAnimalDb = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { 
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
    const document = await addDoc(collection(db, "animais"), 
    {
      animalId: crypto.randomUUID(),
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
      cadastradoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
      atualizadoPor: atualizadoPor,
    });
    revalidatePath("/");
    return JSON.stringify(document);
  })
