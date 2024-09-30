import { db } from "@/lib/firebase/firebase-secret";
import { doc, getDoc } from "firebase/firestore";

export const findOne = async (id: string) => {
    const document = await getDoc(doc(db, `users/${id}`));
    return document.data()
};
