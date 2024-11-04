"use client";

import {
  type ColumnFiltersState,
  type PaginationState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Plus, Filter, ChevronDown, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";
import type { UserWOutPassword } from "@/models/user.model";
import { useState } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/custom-ui/drawer";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as Select from "@radix-ui/react-select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface UsersTableProps {
  data: UserWOutPassword[];
  onDelete?: (row: Row<UserWOutPassword>) => unknown;
  onEdit?: (row: Row<UserWOutPassword>) => unknown;
  onRoleChange?: (row: Row<UserWOutPassword>) => unknown;
  onCreate?: () => unknown;
  pageSize?: number;
  toggle?: () => void;
}

export function UserTable({
  onDelete,
  onEdit,
  data,
  onRoleChange,
  onCreate,
  pageSize = 5,
}: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const table = useReactTable({
    data,
    columns: columns({ roleChange: onRoleChange, delete: onDelete, edit: onEdit }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-6 gap-6 min-h-full">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Pesquise por nome, email..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("user")?.setFilterValue(event.target.value)}
          className="max-w-sm mr-auto"
        />

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => setDrawerOpen(true)}>
              <Filter className="h-4 w-4 text-black" />
            </Button>
          </DrawerTrigger>
          <DrawerContent side="right" backgroundOverlay="transparent">
            <DrawerHeader className="flex flex-col gap-4">
              <DrawerTitle>Filtros</DrawerTitle>

              {/* -------------------- datepicker ----------------- */}
              <div>
                <h1 className="text-md font-bold mb-2">Período</h1>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      aria-label={date ? format(date, "PPP") : "Selecionar período"}
                    >
                      {date ? format(date, "PPP") : <span>Selecionar período</span>}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* ------------ cargo -------------------------- */}
              <div>
                <h1 className="text-md font-bold mb-2">Cargo</h1>
                <Select.Root>
                  <Select.Trigger className="w-full outline-none flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white">
                    <Select.Value placeholder="Selecionar Cargo" />
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Select.Trigger>
                  <Select.Content className="bg-white border border-gray-300 rounded-md shadow-md">
                    <Select.Viewport className="p-2">
                      <Select.Item value="administrador" className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                        <Select.ItemText>Administrador</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="autenticado" className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                        <Select.ItemText>Autenticado</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </div>
            </DrawerHeader>
            {/* ----------------------- botões -------------- */}
            <div className="flex justify-end gap-2 mt-auto p-4">
              <Button
                variant="outline"
                className="bg-white text-black border border-gray-300"
                onClick={() => setDrawerOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                className="bg-black text-white"
                onClick={() => setDrawerOpen(false)}
              >
                Filtrar
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <Button onClick={() => onCreate?.()} className="flex items-center gap-2">
          <Plus />
          Novo usuário
        </Button>
      </div>

      {table.getRowModel().rows?.length ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <Image src="empty-state.svg" alt="empty users image" height={200} width={200} />
          <span className="text-lg text-zinc-400">Parece que não tem usuários cadastrados</span>
        </div>
      )}

      {!!table.getRowModel().rows?.length && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linha(s) selecionada.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
 
    </div> 
    );
}