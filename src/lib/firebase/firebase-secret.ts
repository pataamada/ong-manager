import { initializeApp, getApps, getApp } from "firebase/app"
import { browserLocalPersistence, browserSessionPersistence, getAuth, initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.apikey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)  //initializeAuth(app, {persistence: [browserLocalPersistence]})
console.log(auth)
export const db = getFirestore(app)
export const storage = getStorage(app)
