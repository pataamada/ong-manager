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
	photos: File[]
	observations?: string
	avaliable: boolean
	castration: boolean
	createdAt: Timestamp
	updatedAt: Timestamp
	updatedBy: string // uuid do adm
}

export type CreateAnimal = Omit<Animal, "id" | "createdAt" | "updatedAt">

export type UpdateAnimal = Omit<Animal, "createdAt" | "updatedAt"> & {
	photos: File[]
}
