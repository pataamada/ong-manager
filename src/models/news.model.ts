import type { FieldValue } from "firebase-admin/firestore"

export interface News {
	id: string
	photo: File
	title: string
	tags?: string[]
	description: string
	createdAt: FieldValue
	updatedAt: FieldValue
	updatedBy: string
}

export type CreateNews = Omit<News, "id">
