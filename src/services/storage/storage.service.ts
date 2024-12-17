import { storage } from "@/lib/firebase/firebase-secret"
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage"

const uploadImage = async (image: File, path: string) => {
	if (image === null) {
		throw Error("Nenhuma imagem foi selecionada")
	}
	const storageRef = ref(storage, path)
	await uploadBytesResumable(storageRef, image)
	return await getDownloadURL(storageRef)
}

export const uploadImages = async (images: File[], path: string) => {
	const urls: string[] = []
	for (let i = 0; i < images.length; i++) {
		const fileName = images[i].name.split(".")[0]
		const url = await uploadImage(images[i], `${path}/${fileName}`)
		urls.push(url)
	}
	return urls
}

export const getImages = async (path: string) => {
	const folder = await listAll(ref(storage, path))

	const downloadUrls: [string[], string[]] = [[], []]
	for (const image of folder.items) {
		downloadUrls[0].push(await getDownloadURL(ref(storage, image.fullPath)))
		downloadUrls[1].push(image.fullPath)
	}
	return downloadUrls
}

export const deleteImage = async (path: string) => {
	try {
		await deleteObject(ref(storage, path))
	} catch (error) {
		console.log("error ao apagar imagem", error)
	}
}

export const deleteManyImages = async (path: string) => {
	const folder = await listAll(ref(storage, path))

	for (const image of folder.items) {
		deleteImage(image.fullPath)
	}
}

export const compareAndUploadImages = (
	collectionName: string,
	documentId: string,
	localImages: File[],
	storageImagesNames: string[],
) => {
	// formato imagem local: filename
	// formato imagem storage: collection/id/filename

	const localImagesFormated = localImages.map(img => `${collectionName}/${documentId}/${img.name}`)
	const uniqueImages = new Set(...localImagesFormated, ...storageImagesNames)
	return uniqueImages.size !== storageImagesNames.length
}
