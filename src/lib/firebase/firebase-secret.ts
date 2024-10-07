import { envServerData } from "@/types/env-schema";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: envServerData.apiKey,
    authDomain: envServerData.authDomain,
    projectId: envServerData.projectId,
    storageBucket: envServerData.storageBucket,
    messagingSenderId: envServerData.messagingSenderId,
    appId: envServerData.appId,
    serviceAccountId: envServerData.firebaseAdminProjectId
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app, auth };
