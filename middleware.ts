import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirectTo } from "@/utils";
const publicRoutes: string[] = ["/login", "/register"];
export async function middleware(request: NextRequest) {
    console.log('middleware')
    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const cookieManager = cookies();
    const isAuth = cookieManager.get("__session");
    console.log(isAuth)
    const response = NextResponse.next();
    if (!isAuth && !isPublicRoute) {
        return redirectTo(request, "/login");
    }
    if(isAuth && publicRoutes) {
        return redirectTo(request, "/dashboard");
    }
    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png|favicon.ico$).*)"],
};
