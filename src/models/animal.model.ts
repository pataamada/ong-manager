import type { Timestamp } from "firebase/firestore"

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
	photo: string
	observations?: string
	avaliable: boolean
	castration: boolean
	createdAt: Timestamp
	updatedAt: Timestamp
	updatedBy: string
}

export type CreateAnimal = Omit<Animal, "id" | "createdAt" | "updatedAt" | "photo">& {
	photo: File
}

export type UpdateAnimal = Omit<Animal, "createdAt" | "updatedAt" | "photo"> & {
	photo: File
}
