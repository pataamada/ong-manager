import type { Timestamp } from "firebase-admin/firestore"

export interface News {
	id: string
	photo: string
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
