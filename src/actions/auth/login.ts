"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";
import { signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-secret";
import { createSessionCookie, firebaseApp } from "@/lib/firebase/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findOne } from "@/services/user.service"
import { getAuth } from "firebase-admin/auth"
import type { User } from "@/models/user.model"
// This schema is used to validate input from client.
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export const login = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { email, password } }) => {
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const userId = user.uid
        const userDb: Partial<User> | undefined = await findOne(userId)
        const additionalClaims = {
            role: userDb?.role || 'AUTHENTICATED',
        }
        const token = await getAuth(firebaseApp).createCustomToken(userId, additionalClaims)
        const customToken = await signInWithCustomToken(auth, token)
        const tokenId = await customToken.user.getIdToken()
        const expiresIn = 5 * 60 * 60 * 1000; // 1 hour
        const sessionCookie = await createSessionCookie(tokenId, { expiresIn });
        cookies().set("__session", sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true,
        });
        redirect('/dashboard')
    });
