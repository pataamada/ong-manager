import type { UserRoles } from "@/models/user.model"
import { observable } from "@legendapp/state"
import type { UserRecord } from "firebase-admin/auth"

export const user$ = observable<{ user: UserRecord; role?: UserRoles } | null>(null)
