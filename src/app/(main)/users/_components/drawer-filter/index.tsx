"use client"

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import * as Select from "@radix-ui/react-select"
import { X, ChevronDown } from "lucide-react"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Propriedade de DrawerFilter
type DrawerFilterProps = {
  onClose: () => void
}

export function DrawerFilter({ onClose }: DrawerFilterProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Sidebar side="right">
      <SidebarContent className="flex flex-col h-full p-4 bg-white">
        {/* Topo do Drawer */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            <X size={20} />
          </Button>
        </div>

        {/* Conteúdo do Drawer */}
        <div className="flex flex-col gap-4">
          {/* Seção de Período e Select */}
          <div>
            <h1 className="text-md font-bold mb-2">Período</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
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

          {/* Select de Cargo */}
          <div>
            <h1 className="text-md font-bold mb-2">Cargo</h1>
            <Select.Root>
              <Select.Trigger className="w-full outline-none flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white">
                <Select.Value placeholder="Selecionar Cargo" />
                <ChevronDown className="ml-2 h-4 w-4" />
              </Select.Trigger>
              <Select.Content className="bg-white border border-gray-300 rounded-md shadow-md">
                <Select.Viewport className="p-2">
                  <Select.Item
                    value="administrador"
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    <Select.ItemText>Administrador</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="autenticado"
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    <Select.ItemText>Autenticado</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Spacer para empurrar os botões para o final */}
        <div className="flex-grow" />

        {/* Fim do Drawer com botões no rodapé */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="bg-white text-black border border-gray-300">
            Cancelar
          </Button>
          <Button variant="default" className="bg-black text-white">
            Filtrar
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
