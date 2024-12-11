import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"
import { db, storage } from "@/lib/firebase/firebase-secret"
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage"
import type { EventFormValues } from "@/app/(main)/schedules/_components/modals/create-event/event-form-schema"

export const createEventService = async (data: EventFormValues) => {
	const imageUrl = data.image ? await uploadImageToStorage(data.image) : ""

	const eventCollectionRef = collection(db, "eventos")
	await addDoc(eventCollectionRef, {
		title: data.title,
		description: data.description,
		image: imageUrl,
		date: new Date(data.date).toISOString(),
	})
}

export const updateEventService = async (eventId: string, data: EventFormValues) => {
	const eventDocRef = doc(db, "eventos", eventId)
	const docSnap = await getDoc(eventDocRef)

	const eventCurrentData = docSnap.data()
	const currentImageUrl = eventCurrentData?.image

	if (currentImageUrl) {
		const oldImageRef = ref(storage, currentImageUrl)
		await deleteObject(oldImageRef)
	}

	const newImageUrl = data.image ? await uploadImageToStorage(data.image) : ""

	const document = await updateDoc(eventDocRef, {
		title: data.title,
		date: data.date,
		description: data.description,
		image: newImageUrl,
	})

	return JSON.stringify(document)
}

export const deleteEventService = async (eventId: string) => {
	const eventDocRef = doc(db, "eventos", eventId)
	const docSnap = await getDoc(eventDocRef)

	const eventData = docSnap.data()
	const imageUrl = eventData?.image

	await deleteDoc(eventDocRef)

	if (imageUrl) {
		const imageRef = ref(storage, imageUrl)
		await deleteObject(imageRef)
	}
}

export const uploadImageToStorage = async (base64Image: string) => {
	const storageRef = ref(storage, `eventImages/${Date.now()}`)
	await uploadString(storageRef, base64Image, "data_url")
	const downloadUrl = await getDownloadURL(storageRef)

	return downloadUrl
}

export async function fetchEvents() {
	const eventCollectionRef = collection(db, "eventos")
	const querySnap = await getDocs(eventCollectionRef)
	const allEvents = querySnap.docs.map(doc => ({
		id: doc.id,
		title: doc.data().title,
		date: doc.data().date,
		description: doc.data().description,
		imageUrl: doc.data().image,
	}))

	return allEvents
}

export async function fetchEventById(id: string) {}

export async function fetchFilteredEvents(searchString: string) {}
