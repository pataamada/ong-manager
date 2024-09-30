import { type NextRequest, NextResponse } from "next/server";

export const redirectTo = (request: NextRequest, to: string) =>
    NextResponse.redirect(new URL(to, request.nextUrl));
