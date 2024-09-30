import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const idToken = body.idToken;

    const expiresIn =  1 * 60 * 60 * 1000; // 1 hour

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set("__session", sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
    });

    return NextResponse.json({
        success: true,
        data: "Signed in successfully.",
    });
}
