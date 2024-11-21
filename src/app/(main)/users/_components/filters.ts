import type { UserRoles } from "@/models/user.model"
import { atom } from "jotai"

export const filterDrawerAtom = atom(false)
export const filterAtom = atom<{
	role: UserRoles | undefined
}>({
	role: undefined,
})
