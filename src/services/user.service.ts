import { auth } from "@/lib/firebase/firebase-admin"
import { db } from "@/lib/firebase/firebase-secret"
import { auth as authAdmin } from "@/lib/firebase/firebase-admin"
import type { User, CreateUserPayload, UserRoles, UserWOutPassword } from "@/models/user.model"
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
} from "firebase/firestore"

export const createUser = async (userId: string, params: CreateUserPayload) => {
	const document = await setDoc(doc(db, "users", userId), {
		birthDate: null,
		address: null,
		cpf: params.cpf,
	})
	return document
}

export const findOne = async (id: string) => {
	const document = await getDoc(doc(db, `users/${id}`))
	return document.data()
}

export const findAll = async () => {
	const q = query(collection(db, "users"))
	const users = await auth.listUsers()
	const querySnapshot = await getDocs(q)
	const docs = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
	const filledUsers = users.users.map(user => {
		const userDoc = docs.find(doc => doc.id === user.uid)
		const userValue = {
			uid: user.uid,
			name: user.displayName,
			photo: user.photoURL,
			role: user.customClaims?.role as UserRoles,
			email: user.email,
		}
		if (userDoc) {
			return {
				cpf: userDoc.data.cpf,
				address: userDoc.data.address,
				birthDate: userDoc.data.birthDate,
				...userValue,
			}
		}
		return userValue
	})
	return filledUsers as UserWOutPassword[]
}

export const updateUser = async (params: AtLeast<User, "uid">) => {
	const values = Object.fromEntries(
		Object.entries({
			name: params.name,
			cpf: params.cpf,
			birthDate: params.birthDate,
			phone: params.photo,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		}).filter(([_, value]) => value !== undefined),
	) as AtLeast<User, "uid">

	if (Object.entries(values).length === 0) {
		return
	}
	const updatedDocument = await updateDoc(doc(db, `users/${params.uid}`), values)
	if (params.role) {
		await authAdmin.setCustomUserClaims(params.uid, { role: params.role })
	}
	console.log(updatedDocument)
	return JSON.stringify(updatedDocument)
}

export const deleteUser = async (userId: string) => {
	return await deleteDoc(doc(db, `users/${userId}`))
}
