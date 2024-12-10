'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import { IPropsTotalizer, Totalizer } from "./_components/Totalizer";
import { NewRegister } from "./_components/modals/new-register";
import { useState } from "react";

const mockedTotalizers: IPropsTotalizer[] = [
  {
    type: 'total',
    label: 'Total',
    value: 'R$ 300,00'
  },
  {
    type: 'donations',
    label: 'Doações',
    value: 'R$ 1600,00'
  },
  {
    type: 'expenses',
    label: 'Despesas',
    value: 'R$ 1300,00'
  },
]

export default function Finance() {
  const [isModalNewRegister, setIsModalNewRegister] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'donations' | 'expensive'>('all')

  return (
    <div>
      {isModalNewRegister && (
        <NewRegister
          open={isModalNewRegister}
          onOpenChange={open => setIsModalNewRegister(open)}
        />
      )}

      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {mockedTotalizers.map((i) => (
          <Totalizer
            key={i.type}
            type={i.type}
            label={i.label}
            value={i.value}
          />
        ))}
      </div>
      <div className="flex w-full mt-4 p-6 gap-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E7]">
        <div className="flex w-full gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex p-[5px] rounded-[6px] bg-[#F4F4F5]">
            <div onClick={() => setFilterType('all')} className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${filterType === 'all' ? 'bg-[#FFFFFF]' : 'bg-[#F4F4F5]' }`}>
              <div className="font-semibold text-sm text-[#09090B]">Todas</div>
            </div>
            <div onClick={() => setFilterType('donations')} className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${filterType === 'donations' ? 'bg-[#FFFFFF]' : 'bg-[#F4F4F5]'}`}>
              <div className="font-semibold text-sm text-[##71717A]">Doações</div>
            </div>
            <div onClick={() => setFilterType('expensive')} className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${filterType === 'expensive' ? 'bg-[#FFFFFF]' : 'bg-[#F4F4F5]'}`}>
              <div className="font-semibold text-sm text-[##71717A]">Despesas</div>
            </div>
          </div>
          <div className="flex justify-end flex-1 gap-4 flex-wrap lg:flex-nowrap">
            <Input
              placeholder="Pesquisar..."
              className="w-full max-w-sm"
              leftIcon={
                <Image
                  src={`/search.svg`}
                  width={16}
                  height={16}
                  priority
                  alt="ícone"
                />
              }
            />
            <Input
              placeholder="Selecionar período"
              className="w-full max-w-sm"
              leftIcon={
                <Image
                  src={`/calendar.svg`}
                  width={16}
                  height={16}
                  priority
                  alt="ícone"
                />
              }
            />
            <Button className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]" onClick={() => setIsModalNewRegister(true)}>
              <Plus className="h-5 w-5" />
              Novo registro
            </Button>
          </div>

          {/* list */}
        </div>
      </div>
    </div>
  );
}
