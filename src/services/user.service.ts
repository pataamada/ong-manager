import { auth } from "@/lib/firebase/firebase-admin"
import { db } from "@/lib/firebase/firebase-secret"
import type { User, CreateUserPayload, UserRoles } from "@/models/user.model"
import { compareSync } from "bcrypt-ts"
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
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
	return filledUsers as User[]
}

export const findUserByEmailPassword = async (email: string, password: string) => {
	const q = query(collection(db, "users"), where("email", "==", email))
	const querySnapshot = await getDocs(q)
	const doc = querySnapshot.docs.map(doc => {
		return { id: doc.id, data: doc.data() }
	})
	const result = doc[0]
	if (!result) {
		return
	}
	const isSamePassword = compareSync(password, result.data.password)
	if (!isSamePassword) {
		throw new Error("Senha incorreta!")
	}
	return result
}

export const updateUser = async (params: Partial<User>) => {
	const updatedDocument = await setDoc(doc(db, `users/${params.uid}`), {
		name: params.name,
		cpf: params.cpf,
		birthDate: params.birthDate,
		phone: params.photo,
	})

	return JSON.stringify(updatedDocument)
}

export const deleteUser = async (userId: string) => {
	return await deleteDoc(doc(db, `users/${userId}`))
}
