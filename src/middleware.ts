import { NextResponse, type NextRequest } from "next/server"
import { redirectTo } from "@/utils"
import { verifySession } from "./services/verify-session.service"
import { cookies } from "next/headers"
import { accessPageList, publicPageList, UserRoles } from "./models/user.model"
export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname
	const isPublicRoute = publicPageList.includes(path)
	const response = NextResponse.next()
	const session = cookies().get("__session")?.value
	const isAdmRoutes = accessPageList[UserRoles.Admin].some(route => path.includes(route))
	const paramsFromRoute = request.nextUrl.searchParams.get("from")
	const isParamsFromRouteAdmin = accessPageList[UserRoles.Admin].some(route =>
		paramsFromRoute?.includes(route),
	)
	if (!session && !isPublicRoute) return redirectTo(request, "/login", path)
	const { user, role } = await verifySession(request, session!)

	if (!user && !isPublicRoute) {
		return redirectTo(request, "/login", path)
	}

	if (user) {
		if (paramsFromRoute && isParamsFromRouteAdmin && role === UserRoles.Admin) {
			return redirectTo(request, paramsFromRoute)
		}
		if (paramsFromRoute) {
			return redirectTo(request, paramsFromRoute)
		}
		if (isPublicRoute) {
			return redirectTo(request, role === UserRoles.Admin ? "/dashboard" : "/animals")
		}
		if (role === UserRoles.Authenticated && isAdmRoutes) {
			return redirectTo(request, "/animals")
		}
	}
	return response
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|favicon.ico$).*)"],
}
