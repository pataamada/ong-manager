import type { FieldValue } from "firebase/firestore"

export enum AnimalType {
	Dog = "cachorro",
	Cat = "gato",
}

export enum AnimalSex {
	M = "macho",
	F = "femea",
}
export interface Animal {
	id: string
	name: string
	age?: number
	type: AnimalType
	sex: AnimalSex
	observations?: string
	avaliable: boolean
	castration: boolean
	photos: File[]
	createdAt: FieldValue
	updatedAt: FieldValue
	updatedBy: string // uuid do adm
}

export type CreateAnimal = Omit<Animal, "id">
