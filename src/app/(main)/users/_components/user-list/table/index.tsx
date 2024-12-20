"use client"

import {
	type ColumnFiltersState,
	type Row,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import { Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { getColumns } from "./columns"
import type { UserWOutPassword } from "@/models/user.model"
import { useState } from "react"
import Image from "next/image"
import { filterAtom, filterDrawerAtom } from "../../store"
import { useAtom, useSetAtom } from "jotai"
import type { UserInfo } from "@/hooks/use-auth"
import { ListFilters } from "./list-filters"
// import { Loader } from "./loader"
import { PawLoader } from "@/components/paw-loader"
import { When } from "@/components/when"
import { cn } from "@/lib/utils"

interface UsersTableProps {
	data: UserWOutPassword[]
	loading?: boolean
	currentUser?: UserInfo | null
	onDelete?: (row: Row<UserWOutPassword>) => unknown
	onEdit?: (row: Row<UserWOutPassword>) => unknown
	onRoleChange?: (row: Row<UserWOutPassword>) => unknown
	onCreate?: () => unknown
}

export function UserTable({
	onDelete,
	onEdit,
	onRoleChange,
	onCreate,
	currentUser,
	data,
	loading,
}: UsersTableProps) {
	const [sorting, setSorting] = useState<SortingState>([{ id: "user", desc: false }])
	const setDrawerFilter = useSetAtom(filterDrawerAtom)
	const [columnFilters, setColumnFilters] = useAtom<ColumnFiltersState>(filterAtom)
	const columns = getColumns(
		{ roleChange: onRoleChange, delete: onDelete, edit: onEdit },
		currentUser,
	)
	const table = useReactTable({
		data,
		columns,
		manualPagination: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		pageCount: 100,
		state: {
			sorting,
			columnFilters,
		},
	})

	const onRemoveFilter = (id: string) => {
		setColumnFilters(columnFilters => columnFilters.filter(filter => filter.id !== id))
	}
	const hasContent = !!table.getRowModel().rows?.length
	return (
		<div className="w-full flex flex-col bg-white rounded-lg p-6 gap-6 flex-1">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Pesquise por nome, email..."
					value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
					onChange={event => table.getColumn("user")?.setFilterValue(event.target.value)}
					className="max-w-sm mr-auto"
				/>
				<Button variant="outline" size="icon" onClick={() => setDrawerFilter(true)}>
					<Filter className="h-4 w-4 text-black" />
				</Button>
				<Button onClick={() => onCreate?.()} className="flex items-center gap-2">
					<Plus />
					Novo usuário
				</Button>
			</div>

			<ListFilters columnFilters={columnFilters} onRemoveFilter={onRemoveFilter} />
			<When
				condition={!loading}
				fallback={
					<div className="flex flex-1 items-center justify-center">
						<PawLoader />
					</div>
				}
			>
				<When
					condition={hasContent}
					fallback={
						<div className="w-full flex-grow flex flex-col items-center justify-center">
							<Image
								src="empty-state.svg"
								alt="empty users image"
								height={200}
								width={200}
							/>
							<span className="text-lg text-zinc-400">
								Parece que não tem usuários cadastrados
							</span>
						</div>
					}
				>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={
										row.original.uid === currentUser?.user.uid && "current"
									}
									aria-disabled={!row.original.uid}
									className={cn(
										!row.original.uid && "opacity-50 pointer-events-none",
									)}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</When>
			</When>
		</div>
	)
}
