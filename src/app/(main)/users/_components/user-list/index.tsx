"use client"

import type { User } from "@/models/user.model"
import { ConfirmDeleteUserAlert } from "../modals/confirm-delete"
import { useState } from "react"
import { CreateUpdateUserModal } from "../modals/create-update"
import { UserTable } from "./table"
import type { Row } from "@tanstack/react-table"

interface UsersListProps {
	users?: User[]
}
export function UserList({users = []}: UsersListProps) {
	const [data, setData] = useState(users)
	const [updateUser, setUpdateUser] = useState<User | undefined | null>()
	const [deleteUser, setDeleteUser] = useState<User | null>()
	const handleRoleChange = (row: Row<User>) => {
		const rowValue = row.original
		const updatedData = data.map(oldRow => {
			if (oldRow.uid === rowValue.uid) {
				return rowValue
			}
			return oldRow
		})
		setData(() => updatedData)
	}
	const handleOpenCreate = () => {
		setUpdateUser(null)
	}
	const handleOpenEdit = (row: Row<User>) => {
		setUpdateUser(row.original)
	}
	const handleOpenDelete = (row: Row<User>) => {
		setDeleteUser(row.original)
	}

	return (
		<>
			<UserTable
				data={data}
				onDelete={handleOpenDelete}
				onEdit={handleOpenEdit}
				onRoleChange={handleRoleChange}
				onCreate={handleOpenCreate}
				pageSize={10}
			/>
			<ConfirmDeleteUserAlert open={!!deleteUser} onOpenChange={() => setDeleteUser(null)} />
			<CreateUpdateUserModal
				open={!!(updateUser || updateUser === null)}
				onOpenChange={() => setUpdateUser(undefined)}
				data={updateUser}
			/>
		</>
	)
}
