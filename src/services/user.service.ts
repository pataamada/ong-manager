import { db } from "@/lib/firebase/firebase-secret"
import { type User, UserRoles, type CreateUserPayload } from "@/models/user.model"
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts"
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

export const findAll = async () => {
	const q = query(collection(db, "users"))
	const querySnapshot = await getDocs(q)
	const docs = querySnapshot.docs.map(doc => doc.data()) as User[]	
	return docs
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
	if(!isSamePassword) {
		throw new Error("Senha incorreta!")
	}
	return result
}

export const updateUser = async (params: Partial<User>) => {	
	console.log("params: ",params);
	
	const updatedDocument = await setDoc(
		doc(db, `users/${params.uid}`), {
			name: params.name,
			
		}
	)
	
	return JSON.stringify(updatedDocument)
}


export const deleteUser = async (userId: string) => {
	return await deleteDoc(doc(db, `users/${userId}`))
}
