import { IPropsTotalizer, Totalizer } from "./_components/Totalizer";

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
       {mockedTotalizers.map(i => <Totalizer key={i.type} type={i.type} label={i.label} value={i.value} />)}
      </div>
      <div className="flex"></div>
    </div>
  );
}
