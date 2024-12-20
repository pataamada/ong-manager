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
	Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import {
	compareAndUploadImages,
	deleteManyImages,
	getImages,
	uploadImages,
} from "./storage/storage.service"
import type { CreateNews, News, UpdateNews } from "@/models/news.model"

export const saveNews = async (params: CreateNews) => {
	const createdAt = serverTimestamp()
	const document = await addDoc(collection(db, "noticias"), {
		title: params.title,
		tags: params.tags,
		description: params.description,
		createdAt: createdAt,
		updatedAt: createdAt,
		updatedBy: params.updatedBy,
	})
	try {
		await uploadNewsImage([params.photo], document.id)
	} catch (error) {
		console.log(error)
	}
	return {
		path: document.path,
		id: document.id,
		createdAt: Timestamp.now().toJSON(),
		updatedAt: Timestamp.now().toJSON(),
		updatedBy: params.updatedBy,
	}
}

export const findNews = async (recent: boolean) => {
	let q = null
	if (recent) q = query(collection(db, "noticias"), orderBy("createdAt", "desc"), limit(3))
	q = query(collection(db, "noticias"), orderBy("createdAt", "desc"))
	const querySnapshot = await getDocs(q)
	const news = querySnapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id,
	})) as News[]
	const newsWithImages = await getNewsImages(news)
	return newsWithImages
}

export const findOneNews = async (id: string) => {
	const document = await getDoc(doc(db, `noticias/${id}`))
	return document.data() as News
}

export const updateNews = async (params: AtLeast<UpdateNews, "id">) => {
	const storageImages = await getNewsImage(params.id)
	if (params.photo) {
		const differentImages = compareAndUploadImages(
			"noticias",
			params.id,
			[params.photo],
			storageImages[1],
		)

		try {
			if (differentImages) {
				await deleteNewsImage(params.id)
				await uploadNewsImage([params.photo], params.id)
			}
		} catch (error) {
			console.log(error)
		}
	}

	await updateDoc(doc(db, `noticias/${params.id}`), {
		title: params.title,
		tags: params.tags,
		description: params.description,
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	const image = await getNewsImage(params.id)
	return {
		photo: image[0][0],
	}
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

export const getNewsImage = async (id: string) => {
	return await getImages(`noticias/${id}`)
}

const getNewsImages = (news: News[]) => {
	const newsWithImages = news.map(async news => {
		const storageImages = await getNewsImage(news.id)
		return { ...news, photo: storageImages[0][0] }
	})
	return Promise.all(newsWithImages)
}

const deleteNewsImage = async (id: string) => {
	return await deleteManyImages(`noticias/${id}`)
}
