import { NextResponse, type NextRequest } from "next/server"
import { redirectTo } from "@/utils"
import { verifySession } from "./services/verify-session.service"
import { cookies } from "next/headers"
import { UserRoles } from "./models/user.model"
const publicRoutes = ["/login", "/register", "/forgot-password"]
const admRoutes = ["/dashboard", "/users", "/finance"]
export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname
	const isPublicRoute = publicRoutes.includes(path)
	const response = NextResponse.next()
	const session = cookies().get("__session")?.value
    const isAdmRoutes = admRoutes.includes(path)
	if (!session && !isPublicRoute) return redirectTo(request, "/login")
	const { user, role } = await verifySession(request, session!)

	if (!user && !isPublicRoute) {
        return redirectTo(request, "/login")
    }
	if (user && isPublicRoute) {
	    return redirectTo(request, role === UserRoles.Admin ? '/dashboard' : '/animals')
	}
    if (user && role === UserRoles.Authenticated && !isPublicRoute && isAdmRoutes) {
        return redirectTo(request, "/animals")
    }
	return response
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|favicon.ico$).*)"],
}
