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
	type: AnimalType
	sex: AnimalSex
	photo?: string
	birthDate?: Timestamp
	observations?: string
	available: boolean
	castration: boolean
	createdAt: Timestamp
	updatedAt: Timestamp
	updatedBy: string
}

export type CreateAnimal = Omit<Animal, "id" | "createdAt" | "updatedAt" | "photo" | "birthDate"> & {
	photo?: File
	birthDate?: Date
}

export type UpdateAnimal = Omit<Animal, "createdAt" | "updatedAt" | "photo" | "birthDate"> & {
	photo?: File
	birthDate?: Date
}
