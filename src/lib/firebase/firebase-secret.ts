import { envClientData } from "@/types/client-schema";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: envClientData.apiKey,
    authDomain: envClientData.authDomain,
    projectId: envClientData.projectId,
    storageBucket: envClientData.storageBucket,
    messagingSenderId: envClientData.messagingSenderId,
    appId: envClientData.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export { app, auth }
