import { db } from "@/lib/firebase/firebase-secret"
import { UserRoles, type CreateUserPayload } from "@/models/user.model"
import { genSaltSync, hashSync } from "bcrypt-ts"
import {
	collection,
	deleteDoc,
	doc,
	type DocumentData,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore"

export const createUser = async (userId: string, params: CreateUserPayload) => {
	const salt = genSaltSync(10)
	const hash = hashSync(params.password, salt)
	const document = await setDoc(doc(db, "users", userId), {
		name: params.name,
		email: params.email,
		password: hash,
		role: UserRoles.Authenticated,
		birthDate: null,
		address: null,
	})
	return document
}

export const findOne = async (id: string) => {
	const document = await getDoc(doc(db, `users/${id}`))
	return document.data()
}

export const findUserByEmailPassword = async (email: string, password: string) => {
	const q = query(
		collection(db, "users"),
		where("email", "==", email),
		where("password", "==", password),
	)
	const querySnapshot = await getDocs(q)
	const doc = querySnapshot.docs.map(doc => {
		return { id: doc.id, data: doc.data() }
	})
	return doc[0] as
		| {
				id: string
				data: DocumentData
		  }
		| undefined
}

export const deleteUser = async (userId: string) => {
	return await deleteDoc(doc(db, `users/${userId}`))
}
