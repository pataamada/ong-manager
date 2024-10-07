"use server";
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveAnimalDb } from "@/services/animal.service";

const schema = z.object({
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

export const saveAnimalAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: {
    nome, idade, tipo, sexo, tamanho, fotos, observacoes, castrado, vacinas, disponivel, atualizadoPor,
  }}) => {
    const createdAnimal = await saveAnimalDb(
      nome, idade, tipo, sexo, tamanho, fotos, observacoes, castrado, vacinas, disponivel, atualizadoPor
    );
    return JSON.stringify(createdAnimal);
  })
