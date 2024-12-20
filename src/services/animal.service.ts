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
import type { Animal, CreateAnimal, UpdateAnimal } from "@/models/animal.model"
import {
	compareAndUploadImages,
	deleteManyImages,
	getImages,
	uploadImages,
} from "./storage/storage.service"

export const saveAnimal = async (params: CreateAnimal) => {
	const document = await addDoc(collection(db, "animais"), {
		name: params.name,
		age: params.age,
		type: params.type,
		sex: params.sex,
		observations: params.observations,
		avaliable: params.avaliable,
		castration: params.castration,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	let photos: string[] = []
	try {
		photos = await uploadAnimalImage([params.photo], document.id)
	} catch (error) {
		console.log(error)
	}
	return JSON.stringify({
		id: document.id,
		photo: photos[0],
		createdAt: Timestamp.now().toJSON(),
		updatedAt: Timestamp.now().toJSON(),
		updatedBy: params.updatedBy,
	})
}

export const findAnimals = async () => {
	const q = query(collection(db, "animais"))
	const querySnapshot = await getDocs(q)
	const animals = querySnapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id,
	})) as Animal[]
	const animalsWithImages = await getAnimalImages(animals)
	return animalsWithImages
}

export const findRecentAnimals = async () => {
	const q = query(collection(db, "animais"), orderBy("createdAt"), limit(6))
	const querySnapshot = await getDocs(q)
	const animals = querySnapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id,
	})) as Animal[]
	const animalsWithImages = await getAnimalImages(animals)
	return animalsWithImages
}

export const findAnimalById = async (animalId: string) => {
	const document = await getDoc(doc(db, `animais/${animalId}`))
	return document.data() as Animal
}

export const updateAnimal = async (params: AtLeast<UpdateAnimal, "id">) => {
	const storageImages = await getAnimalImage(params.id)

	if (params.photo) {
		const differentImages = compareAndUploadImages(
			"animais",
			params.id,
			[params.photo],
			storageImages[1],
		)

		if (differentImages) {
			await deleteAnimalImage(params.id)
			await uploadAnimalImage([params.photo], params.id)
		}
	}

	console.log({
		name: params.name,
		age: params.age,
		type: params.type,
		sex: params.sex,
		observations: params.observations,
		avaliable: params.avaliable,
		castration: params.castration,
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	await updateDoc(doc(db, `animais/${params.id}`), {
		name: params.name,
		age: params.age,
		type: params.type,
		sex: params.sex,
		observations: params.observations,
		avaliable: params.avaliable,
		castration: params.castration,
		updatedAt: serverTimestamp(),
		updatedBy: params.updatedBy,
	})
	return true
}

export const deleteAnimal = async (id: string) => {
	const storageImages = await getAnimalImage(id)
	if (storageImages.length > 0) await deleteAnimalImage(id)

	await deleteDoc(doc(db, `animais/${id}`))
	return true
}

const uploadAnimalImage = async (image: File[], animalId: string) => {
	return await uploadImages(image, `animais/${animalId}`)
}

const getAnimalImage = async (id: string) => {
	return await getImages(`animais/${id}`)
}

const getAnimalImages = (animals: Animal[]) => {
	const animalsWithImages = animals.map(async animal => {
		const storageImages = await getAnimalImage(animal.id)
		return { ...animal, photo: storageImages[0][0] }
	})
	return Promise.all(animalsWithImages)
}

const deleteAnimalImage = async (id: string) => {
	return await deleteManyImages(`animais/${id}`)
}
