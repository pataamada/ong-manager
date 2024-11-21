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
} from "firebase/firestore"
import { db, storage } from "@/lib/firebase/firebase-secret"

export const saveDonationDb = async (
	userId: string | undefined,
	animalId: string | undefined,
	category: string,
	value: number,
	description: string,
	date: string,
) => {}

export const saveExpenseDb = async (
	userId: string,
	category: string,
	value: number,
	proof: string[],
	description: string,
	date: string,
) => {}
