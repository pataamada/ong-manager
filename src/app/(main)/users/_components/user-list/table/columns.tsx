"use client"
import { BadgeMenu } from "@/components/custom-ui/badge-menu"
import { type UserWOutPassword, UserRoles } from "@/models/user.model"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { ActionMenu } from "../action-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { initialLetters } from "@/utils"
import { format } from "@react-input/mask"
import { contains } from "@/utils/contains"
import type { UserInfo } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export const getColumns = (
	callbacks: {
		roleChange?: (row: Row<UserWOutPassword>) => unknown
		edit?: (row: Row<UserWOutPassword>) => unknown
		delete?: (row: Row<UserWOutPassword>) => unknown
	},
	currentUser?: UserInfo | null,
): ColumnDef<UserWOutPassword>[] => {
	const isCurrentUser = (row: Row<UserWOutPassword>) => row.original.uid === currentUser?.user.uid
	return [
		{
			id: "user",
			accessorFn: row => `${row.name}-${row.email}`,
			header: "Usuário",
			meta: {
				title: "Usuário",
			},
			filterFn: (user, _, filterValue) => {
				return (
					contains(user.original.email, filterValue) ||
					contains(user.original.name, filterValue) ||
					contains(user.original.uid, filterValue) ||
					contains(user.original.cpf, filterValue)
				)
			},
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage src={row.original.photo} />
						<AvatarFallback
							className={cn(isCurrentUser(row) && "bg-emerald-500 text-white font-bold")}
						>
							{initialLetters(row.original.name)}
						</AvatarFallback>
					</Avatar>
					<div>
						<h6 className="font-semibold text-md text-zinc-900">{`${row.original.name} ${isCurrentUser(row) ? "(Você)" : ""} `}</h6>
						<span className="text-zinc-500">{row.original.email}</span>
					</div>
				</div>
			),
		},
		{
			accessorKey: "uuid",
			meta: {
				title: "ID",
			},
			header: () => <div className="text-center">ID</div>,
			cell: ({ row }) => <div className="text-center lowercase">{row.original.uid}</div>,
		},
		{
			accessorKey: "cpf",
			meta: {
				title: "CPF",
			},
			header: () => <div className="text-center">CPF</div>,
			cell: ({ row }) => (
				<div className="text-center font-medium">
					{format(row.original.cpf, { mask: "___.___.___-__", replacement: { _: /\d/ } })}
				</div>
			),
		},
		{
			accessorKey: "role",
			meta: {
				title: "Cargo",
			},
			header: () => <div className="text-center">Cargo</div>,
			cell: ({ row, getValue }) => (
				<div className="w-full flex justify-center">
					<BadgeMenu
						title="Selecionar Cargo"
						value={getValue() as string}
						onValueChange={value => {
							callbacks.roleChange?.({
								...row,
								original: { ...row.original, role: value as UserRoles },
							})
						}}
						readonly={isCurrentUser(row)}
						options={[
							{
								title: "Administrador",
								value: UserRoles.Admin,
								description: "Ver, Criar, Atualizar e Apagar",
							},
							{ title: "Autenticado", value: UserRoles.Authenticated, description: "Ver" },
						]}
					/>
				</div>
			),
		},
		{
			id: "actions",
			meta: {
				title: "ações",
			},
			header: () => <div className="text-right">Ações</div>,
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<div className="w-full flex justify-end">
						<ActionMenu
							value={row}
							noDelete={isCurrentUser(row)}
							onEditClick={callbacks.edit}
							onDeleteClick={callbacks.delete}
						/>
					</div>
				)
			},
		},
	]
}
