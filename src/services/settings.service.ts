import { db } from "@/lib/firebase/firebase-secret"
import type { SettingsModel } from "@/models/settings"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"

export const createSettings = async (params: Omit<SettingsModel, "id">) => {
	const document = await addDoc(collection(db, "settings"), params)
	return document
}

export const getSettings = async () => {
	const q = query(collection(db, "settings"))
	const querySnapshot = await getDocs(q)
	const docs = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}))
	let doc = docs?.[0]
	if (!doc) {
		const result = await createSettings({})
		doc = { id: result.id }
	}
	return doc as SettingsModel
}

export const updateSettings = async ({ id, ...params }: AtLeast<SettingsModel, "id">) => {
	const currentDoc = await getDoc(doc(db, `settings/${id}`))
	const currentData = currentDoc.data() || {}

	const mergedData = {
		...currentData,
		...params,
	}

	const values = Object.fromEntries(
		Object.entries(mergedData).filter(([_, value]) => value !== undefined),
	) as AtLeast<SettingsModel, "id">

	if (Object.entries(values).length === 0) {
		return
	}

	const updatedDocument = await updateDoc(doc(db, `settings/${id}`), values)
	return JSON.stringify(updatedDocument)
}
