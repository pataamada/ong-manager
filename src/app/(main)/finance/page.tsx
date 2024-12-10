import { Input } from "@/components/ui/input";
import { IPropsTotalizer, Totalizer } from "./_components/Totalizer";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import Image from "next/image";

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
  return (
    <div>
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
        <div className="flex w-full gap-4 justify-between flex-wrap lg:flex-nowrap">
			<div className="flex p-[5px] rounded-[6px] bg-[#F4F4F5]">
				<div className="flex justify-center items-center px-3 h-[34px] bg-[#FFFFFF]">
					<div className="font-semibold text-sm text-[#09090B]">Todas</div>
				</div>
				<div className="flex justify-center items-center px-3 h-[34px] bg-[#F4F4F5]">
					<div className="font-semibold text-sm text-[##71717A]">Doações</div>
				</div>
				<div className="flex justify-center items-center px-3 h-[34px] bg-[#F4F4F5]">
					<div className="font-semibold text-sm text-[##71717A]">Despesas</div>
				</div>
			</div>
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
            <Input
              placeholder="Pesquisar..."
              className="max-w-sm mr-auto"
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
              className="max-w-sm mr-auto"
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
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Novo registro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
