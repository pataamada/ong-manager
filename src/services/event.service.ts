import {
	collection,
	getDocs,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	query,
} from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import type { CreateEvent, Event } from "@/models/event.model"
import {
	compareAndUploadImages,
	deleteManyImages,
	getImages,
	uploadImages,
} from "./storage/storage.service"

export const createEvent = async (params: CreateEvent) => {
	const document = await addDoc(collection(db, "eventos"), {
		title: params.title,
		description: params.description,
		date: new Date(params.date).toISOString(),
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	await uploadEventlImage(params.images, document.id)

	return JSON.stringify(document)
}

export const findAllEvents = async () => {
	const q = query(collection(db, "eventos"))
	const querySnapshot = await getDocs(q)
	const events = querySnapshot.docs.map(doc => doc.data())
	return events as Event[]
}

export const updateEvent = async (params: Event) => {
	const storageImages = await getEventImage(params.id)
	const differentImages = compareAndUploadImages(
		"eventos",
		params.id,
		params.images,
		storageImages[1],
	)

	if (differentImages) {
		await deleteEventImage(params.id)
		await uploadEventlImage(params.images, params.id)
	}

	const document = await updateDoc(doc(db, `eventos/${params.id}`), {
		title: params.title,
		date: params.date,
		description: params.description,
	})

	return JSON.stringify(document)
}

export const deleteEvent = async (eventId: string) => {
	const storageImages = await getEventImage(eventId)
	if (storageImages.length > 0) await deleteEventImage(eventId)

	await deleteDoc(doc(db, "eventos", eventId))
}

export async function fetchEvents() {
	const querySnap = await getDocs(collection(db, "eventos"))
	const allEvents = querySnap.docs.map(doc => ({
		id: doc.id,
		title: doc.data().title,
		date: doc.data().date,
		description: doc.data().description,
	}))

	return allEvents
}

export const uploadEventlImage = async (image: File[], id: string) => {
	return await uploadImages(image, `eventos/${id}`)
}

export const getEventImage = async (id: string) => {
	return await getImages(`eventos/${id}`)
}

export const deleteEventImage = async (id: string) => {
	return await deleteManyImages(`eventos/${id}`)
}
