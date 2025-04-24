import { db } from "@/lib/firebase/firebase-secret"
import type { Social, SocialCreatePayload } from "@/models/social.modal"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"

export const createSocial = async (params: SocialCreatePayload) => {
	const document = await addDoc(collection(db, "social"), {
		type: params.type,
		content: params.content,
	})
	return document
}

export const findOne = async (id: string) => {
	const document = await getDoc(doc(db, `social/${id}`))
	return document.data()
}

export const findAll = async () => {
	const q = query(collection(db, "social"))
	const querySnapshot = await getDocs(q)
	const docs = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}))
	return docs as Social[]
}

export const updateSocial = async (params: AtLeast<Social, "id">) => {
	const values = Object.fromEntries(
		Object.entries({
			type: params.type,
			content: params.content,
		}).filter(([_, value]) => value !== undefined),
	) as AtLeast<Social, "id">

	if (Object.entries(values).length === 0) {
		return
	}
	const updatedDocument = await updateDoc(doc(db, `social/${params.id}`), values)
	return JSON.stringify(updatedDocument)
}
