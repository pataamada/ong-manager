import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { createSessionCookie, firebaseApp } from "@/lib/firebase/firebase-admin"
import { findOne } from "@/services/user.service"
import { getAuth } from "firebase-admin/auth"
import type { User } from "@/models/user.model"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const idToken = body.idToken
	const userId = body.id

	const userDb: Partial<User> | undefined = await findOne(userId)
	console.log(userDb)

	const additionalClaims = {
		role: userDb!.role,
	}
	const token = await getAuth(firebaseApp).createCustomToken(userId, additionalClaims)
	console.log(token)

	const expiresIn = 1 * 60 * 60 * 1000 // 1 hour
	const sessionCookie = await createSessionCookie(idToken, { expiresIn })

	cookies().set("__session", sessionCookie, {
		maxAge: expiresIn,
		httpOnly: true,
		secure: true,
	})

	return NextResponse.json({
		success: true,
		data: "Signed in successfully.",
	})
}
