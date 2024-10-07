"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateAnimal } from "@/services/animal.service"

const schema = z.object({
  animalId: z.string(),
  nome: z.string(),
  idade: z.number(),
  tipo: z.string(),
  sexo: z.string(),
  tamanho: z.string(),
  fotos: z.array(z.string()),
  observacoes: z.string(),
  castrado: z.boolean(),
  vacinas: z.array(z.string()),
  disponivel: z.boolean(),
  atualizadoPor: z.string(),
})

export const updateAnimalAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: {
    animalId, nome, idade, tipo, sexo, tamanho, fotos, observacoes, castrado, vacinas, disponivel, atualizadoPor
  }}) => {
    const updateDocument = await updateAnimal(
      animalId, nome, idade, tipo, sexo, tamanho, fotos, observacoes, castrado, vacinas, disponivel, atualizadoPor
    );
    return JSON.stringify(updateDocument);
  })