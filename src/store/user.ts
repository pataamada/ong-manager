import type { UserRoles } from "@/models/user.model"
import type { UserRecord } from "firebase-admin/auth"
import { atom } from "jotai";

export const userAtom = atom<{ user: UserRecord; role?: UserRoles } | null>(null)
