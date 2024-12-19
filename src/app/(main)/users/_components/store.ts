import type { ColumnFiltersState } from "@tanstack/react-table"
import { atom } from "jotai"

export const filterDrawerAtom = atom(false)
export const filterAtom = atom<ColumnFiltersState>([])
export const modalUserAtom = atom(false)
export const confirmDeleteAtom = atom(false)