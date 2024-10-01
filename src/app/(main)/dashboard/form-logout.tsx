"use client"

import { logout } from "@/actions/auth/logout"
import { Button } from "@/components/ui/button"

export default function FormLogout() {
	return (
		<Button className="w-fit" onClick={() => logout()} variant="destructive">
			Sair
		</Button>
	)
}
