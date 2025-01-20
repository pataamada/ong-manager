"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToBrazilian } from "@/utils/formatData";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Data {
  category: string;
  description: string;
  date: string;
  value: number;
}

interface TableProps {
  data: Data[];
}

export function TableExpense({ data }: TableProps) {
  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ getValue }) => (
        <div className="font-normal text-base text-[#09090B]">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }) => (
        <div className="font-normal text-base text-[#09090B]">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ getValue }) => (
        <div className="font-normal text-base text-[#09090B]">
          {formatDateToBrazilian(getValue() as string)}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ getValue }) => (
        <div className={"font-normal text-base text-[#EF4444]"}>
          {(getValue() as number).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data.filter((row) =>
      row.category.toLowerCase().includes(filter.toLowerCase())
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      {/* <Input
        placeholder="Filter by category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-md"
      /> */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
