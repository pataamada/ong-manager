import type { Event } from "@/models/event.model"
import type { News } from "@/models/news.model"
import { atom } from "jotai"

export const modalCreateEvent = atom(false)
export const modalCreateNews = atom(false)
export const modalConfirmDelete = atom(false)
export const drawerFilterAtom = atom(false)
export const updateNewsData = atom<null | AtLeast<News, "id">>(null)
export const updateEventData = atom<null | AtLeast<Event, "id">>(null)
export const confirmDeleteInfo = atom<null | {
	type: "event" | "news"
	description: string
	title: string
	id: string
}>(null)

export const filterSearchAtom = atom("")
export const filterOrderAtom = atom<"older" | "newer">("newer")
