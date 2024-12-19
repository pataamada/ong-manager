"use client"
import type { Animal } from "@/models/animal.model"
import { atom } from "jotai"

export const filterDrawerAtom = atom(false)
export const filtersAtom = atom<
	Partial<{
		type: string
		sex: string
		maxAge: number
		available: boolean
		neutered: boolean
	}>
>({})
export const searchFilterAtom = atom<string>("")
export const modalAnimalAtom = atom(false)
export const updateAnimalInfo = atom<AtLeast<Animal, "id" | "updatedBy"> | null>(null)
export const confirmDeleteInfoAtom = atom<null | {
	description: string
	title: string
	id: string
}>(null)
export const confirmDeleteAnimalAtom = atom(false)
export const createAnimalModalAtom = atom(false)
