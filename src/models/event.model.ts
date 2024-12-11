export interface Event {
	id: string
	title: string
	description: string
	date: string
	images: File[]
	updatedBy: string
}

export type CreateEvent = Omit<Event, "id">
