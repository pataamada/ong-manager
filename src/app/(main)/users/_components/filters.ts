import type { ColumnFiltersState } from "@tanstack/react-table"
import { atom } from "jotai"

export const filterDrawerAtom = atom(false)
export const filterAtom = atom<ColumnFiltersState>([])
