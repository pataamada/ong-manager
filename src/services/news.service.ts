import {
	collection,
	query,
	getDocs,
	getDoc,
	doc,
	addDoc,
	updateDoc,
	serverTimestamp,
	deleteDoc,
	orderBy,
	limit,
} from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import {
	compareAndUploadImages,
	deleteManyImages,
	getImages,
	uploadImages,
} from "./storage/storage.service"
import type { CreateNews, News } from "@/models/news.model"

export const saveNews = async (params: CreateNews) => {
	const document = await addDoc(collection(db, "noticias"), {
		title: params.title,
		tags: params.tags,
		description: params.description,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	await uploadNewsImage([params.photo], document.id)
	return JSON.stringify(document)
}

export const findNews = async () => {
	const q = query(collection(db, "noticias"))
	const querySnapshot = await getDocs(q)
	const news = querySnapshot.docs.map(doc => doc.data())
	return news as News[]
}

export const findRecentNews = async () => {
	const q = query(collection(db, "noticias"), orderBy("createdAt"), limit(3))
	const querySnapshot = await getDocs(q)
	const news = querySnapshot.docs.map(doc => doc.data())
	return news as News[]
}

export const findOneNews = async (id: string) => {
	const document = await getDoc(doc(db, `noticias/${id}`))
	return document.data() as News
}

export const updateNews = async (params: News) => {
	const storageImages = await getNewsImage(params.id)
	const differentImages = compareAndUploadImages(
		"noticias",
		params.id,
		[params.photo],
		storageImages[1],
	)

	if (differentImages) {
		await deleteNewsImage(params.id)
		await uploadNewsImage([params.photo], params.id)
	}

	await updateDoc(doc(db, `noticias/${params.id}`), {
		title: params.title,
		tags: params.tags,
		description: params.description,
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	return true
}

export const deleteNews = async (id: string) => {
	const storageImages = await getNewsImage(id)
	if (storageImages.length > 0) await deleteNewsImage(id)

	await deleteDoc(doc(db, `noticias/${id}`))
	return true
}

const uploadNewsImage = async (image: File[], newsId: string) => {
	return await uploadImages(image, `noticias/${newsId}`)
}

const getNewsImage = async (id: string) => {
	return await getImages(`noticias/${id}`)
}

const deleteNewsImage = async (id: string) => {
	return await deleteManyImages(`noticias/${id}`)
}
