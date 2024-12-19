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
	where,
} from "firebase/firestore"

export const createUser = async (userId: string, params: CreateUserPayload) => {
	const document = await setDoc(doc(db, "users", userId), {
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
			phone: user.phoneNumber,
		}
		if (userDoc) {
			return {
				cpf: userDoc.data.cpf,
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
			phone: params.phone,
		}).filter(([_, value]) => value !== undefined),
	) as AtLeast<User, "uid">

	if (params.role) {
		await authAdmin.setCustomUserClaims(params.uid, { role: params.role })
	}

	if (Object.entries(values).length === 0) {
		return
	}
	const updatedDocument = await updateDoc(doc(db, `users/${params.uid}`), values)
	if (params?.password) {
		await authAdmin.updateUser(params.uid, { password: params.password })
	}
	return JSON.stringify(updatedDocument)
}

export const deleteUser = async (userId: string) => {
	return await deleteDoc(doc(db, `users/${userId}`))
}

export const existsCpf = async (cpf: string) => {
	const q = query(collection(db, "users"), where("cpf", "==", cpf))
	const querySnapshot = await getDocs(q)
	return !querySnapshot.empty
}
