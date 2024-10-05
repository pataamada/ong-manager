import { type NextRequest, NextResponse } from "next/server";

export const redirectTo = (request: NextRequest, to: string) =>
    NextResponse.redirect(new URL(to, request.nextUrl));

export const initialLetters = (fullname: string) => {
    const names = fullname.split(" ")
    if(names.length < 2) {
        return fullname.slice(2)
    }  
    return names[0][0] + names[1][0]
} 