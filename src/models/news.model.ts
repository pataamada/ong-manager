import type { Timestamp } from "firebase/firestore"

export interface News {
	id: string
	photo: File
	title: string
	tags?: string[]
	description: string
	createdAt: Timestamp
	updatedAt: Timestamp
	updatedBy: string
}

export type CreateNews = Omit<News, "id" | "createdAt" | "updatedAt" | "photo"> & {
	photo: File
}
export type UpdateNews = News & {
	photo: File
}
