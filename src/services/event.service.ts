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
import type { CreateEvent, Event, UpdateEvent } from "@/models/event.model"
import {
	compareAndUploadImages,
	deleteManyImages,
	getImages,
	uploadImages,
} from "./storage/storage.service"
import { getNewsImage } from "./news.service"

export const createEvent = async (params: CreateEvent) => {
	const document = await addDoc(collection(db, "eventos"), {
		title: params.title,
		description: params.description,
		date: new Date(params.date).toISOString(),
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	let image: string[] | undefined
	try {
		image = await uploadEventImage([params.image], document.id)
	} catch (error) {
		console.log(error)
	}

	return {
		id: document.id,
		image: image ? image[0] : undefined,
	}
}

export const findAllEvents = async () => {
	const q = query(collection(db, "eventos"))
	const querySnapshot = await getDocs(q)
	const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[]
	const eventWithImages = await getEventImages(events)
	return JSON.stringify(eventWithImages)
}

export const updateEvent = async (params: AtLeast<UpdateEvent, "id">) => {
	const storageImages = await getEventImage(params.id)
	if (params.image) {
		const differentImages = compareAndUploadImages(
			"eventos",
			params.id,
			[params.image],
			storageImages[1],
		)

		if (differentImages) {
			await deleteEventImage(params.id)
			await uploadEventImage([params.image], params.id)
		}
	}

	await updateDoc(doc(db, `eventos/${params.id}`), {
		title: params.title,
		date: params.date,
		description: params.description,
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	const image = await getNewsImage(params.id)
	return {
		photo: image[0][0],
	}
}

export const deleteEvent = async (eventId: string) => {
	const storageImages = await getEventImage(eventId)
	if (storageImages.length > 0) await deleteEventImage(eventId)

	await deleteDoc(doc(db, "eventos", eventId))
	return true
}

export const uploadEventImage = async (image: File[], id: string) => {
	return await uploadImages(image, `eventos/${id}`)
}

export const getEventImage = async (id: string) => {
	return await getImages(`eventos/${id}`)
}

const getEventImages = (events: Event[]) => {
	const eventWithImages = events.map(async event => {
		const storageImages = await getEventImage(event.id)
		return { ...event, image: storageImages[0][0] }
	})
	return Promise.all(eventWithImages)
}

export const deleteEventImage = async (id: string) => {
	return await deleteManyImages(`eventos/${id}`)
}
