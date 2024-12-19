export interface Event {
	id: string
	title: string
	description: string
	date: string
	image: string
	updatedBy: string
}

export type CreateEvent = Omit<Event, "id"  | "image"> & {
	image: File
}
export type UpdateEvent = Omit<Event, "image"> & {
	image: File
}
