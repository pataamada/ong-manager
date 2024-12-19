import { envServerSchema } from "@/types/env-schema"
import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: envServerSchema.apiKey,
    authDomain: envServerSchema.authDomain,
    projectId: envServerSchema.projectId,
    storageBucket: envServerSchema.storageBucket,
    messagingSenderId: envServerSchema.messagingSenderId,
    appId: envServerSchema.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export { app, auth }