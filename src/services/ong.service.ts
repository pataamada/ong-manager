import { db } from "@/lib/firebase/firebase-secret"
import type { IOng } from "@/models/ong.model"
import { doc, updateDoc } from "firebase/firestore"

export const updateInfo = async (params: IOng) => {
	await updateDoc(doc(db, "ong/informacoes"), {
		email: params.email,
		facebook: params.facebook,
		instagram: params.instagram,
		localizacao: params.localizacao,
		pontosDoacao: params.pontosDoacao,
		telefone: params.telefone,
	})
	return true
}
