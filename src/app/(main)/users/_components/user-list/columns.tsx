"use client"
import { BadgeMenu } from "@/components/custom-ui/badge-menu"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserWOutPassword, UserRoles } from "@/models/user.model"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { ActionMenu } from "./action-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { initialLetters } from "@/utils"
import { format } from "@react-input/mask"

export const columns = (callbacks: {
	roleChange?: (row: Row<UserWOutPassword>) => unknown
	edit?: (row: Row<UserWOutPassword>) => unknown
	delete?: (row: Row<UserWOutPassword>) => unknown
}): ColumnDef<UserWOutPassword>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "user",
		accessorFn: row => `${row.name}-${row.email}`,
		header: "Usuário",
		meta: {
			title: "Usuário",
		},
		filterFn: (user, _, filterValue) => {
			return user.original.email.includes(filterValue.toLowerCase())
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src={row.original.photo} />
					<AvatarFallback>{initialLetters(row.original.name)}</AvatarFallback>
				</Avatar>
				<div>
					<h6 className="font-semibold text-md text-zinc-900">{row.original.name}</h6>
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
						row.original.role = value as UserRoles
						callbacks.roleChange?.(row)
					}}
					options={[
						{
							title: "Administrador",
							value: "ADMIN",
							description: "Ver, Criar, Atualizar e Apagar",
						},
						{ title: "Autenticado", value: "AUTHENTICATED", description: "Ver" },
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
					<ActionMenu value={row} onEditClick={callbacks.edit} onDeleteClick={callbacks.delete} />
				</div>
			)
		},
	},
]
