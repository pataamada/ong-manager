import { atom } from "jotai";

export const createEventModal = atom(false)
export const createNewsModal = atom(false)
export const confirmDeleteModal = atom(false)
export const filterDrawerAtom = atom(false)
export const confirmDeleteInfo = atom<null | { description: string, title: string, id: string }>(null)