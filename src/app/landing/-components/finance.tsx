'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// Types for our data
interface FinanceData {
  stats: {
    saudePets: number;
    funcionarios: number;
    racao: number;
    materiaisLimpeza: number;
  };
  monthlyData: {
    name: string;
    despesas: number;
    doacoes: number;
  }[];
  barData: {
    name: string;
    value: number;
  }[];
  meta: {
    atual: number;
    total: number;
  };
}

// Mock data - replace with API call
const mockData: FinanceData = {
  stats: {
    saudePets: 4200,
    funcionarios: 2824,
    racao: 2685,
    materiaisLimpeza: 1247
  },
  monthlyData: [
    { name: 'OUT', despesas: 500, doacoes: 1000 },
    { name: 'NOV', despesas: 1500, doacoes: 2000 },
    { name: 'DEZ', despesas: 1200, doacoes: 1800 },
    { name: 'JAN', despesas: 1800, doacoes: 1900 },
    { name: 'FEV', despesas: 1600, doacoes: 2200 },
    { name: 'MAR', despesas: 2000, doacoes: 2100 },
  ],
  barData: [
    { name: '1', value: 400 },
    { name: '2', value: 300 },
    { name: '3', value: 600 },
    { name: '4', value: 200 },
    { name: '5', value: 500 },
    { name: '6', value: 400 },
  ],
  meta: {
    atual: 1580.00,
    total: 3000
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground finance-label">
              {label}
            </span>
            {payload.map((entry: any, index: number) => (
              <span key={index} className="finance-label text-muted-foreground" style={{ color: entry.color }}>
                R$ {entry.value.toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function Finance() {
  // In a real app, you'd fetch data here
  const data = mockData;
  const progressPercentage = (data.meta.atual / data.meta.total) * 100;

  return (
    <section id="finance" className="w-full">
      <div className="max-w-8xl mx-auto relative">
        {/* Main Content with negative margin to create space for the red bar */}
        <div className="bg-slate-200 rounded-[40px] px-8 pb-8 relative mt-[120px] md:mt-[140px]">
          {/* Red Stats Bar - Fixed position relative to main content */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[95%] md:max-w-[80%] top-0">
            <div className="bg-red-500 rounded-2xl grid grid-cols-2 md:grid-cols-4 text-white overflow-hidden">
              <div className="p-4 md:p-6 text-center border-b md:border-b-0 md:border-r border-red-400">
                <p className="finance-title">R${data.stats.saudePets}</p>
                <p className="finance-description mt-2">Saúde dos Pets</p>
              </div>
              <div className="p-4 md:p-6 text-center border-b md:border-b-0 md:border-r border-red-400">
                <p className="finance-title">R${data.stats.funcionarios}</p>
                <p className="finance-description mt-2">Funcionários</p>
              </div>
              <div className="p-4 md:p-6 text-center border-b md:border-b-0 md:border-r border-red-400">
                <p className="finance-title">R${data.stats.racao}</p>
                <p className="finance-description mt-2">Ração</p>
              </div>
              <div className="p-4 md:p-6 text-center">
                <p className="finance-title">R${data.stats.materiaisLimpeza}</p>
                <p className="finance-description mt-2">Materiais de Limpeza</p>
              </div>
            </div>
          </div>

          {/* Charts Content */}
          <div className="grid md:grid-cols-2 gap-6 md:px-16 md:py-10 pt-[120px] md:pt-[140px]">
            {/* Left Side - Main Chart */}
            <div className="space-y-4 bg-white rounded-xl sm:px-6 sm:py-4 p-4 pl-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className='finance-chart-label text-zinc-400'>Total</span>
                  <p className="finance-2-title">R$ 4.000,00</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded"/>
                    <span className="finance-2-description">Doações</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-orange-500 rounded" />
                    <span className="finance-2-description">Despesas</span>
                  </div>
                </div>
              </div>

              <div className=" h-[300px] rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="finance-chart-label" />
                    <YAxis className="finance-chart-label" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="doacoes"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="despesas"
                      stroke="#F97316"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Side - Progress and Small Charts */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg h-[230px] py-8 p-4 ">
                <h3 className="finance-2-title">Meta de Arrecadação do Mês</h3>
                <div className="flex mt-8">
                  <span className="finance-2-description text-zinc-500">R$ {data.meta.atual},00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-2xl h-12">
                  <div
                    className="bg-red-500 h-12 rounded-2xl transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="finance-2-title">Doações</h3>
                    <span className="finance-2-description bg-[#E0ECFF] text-[#3B82F6] px-2 py-1 rounded-full">+2.45%</span>
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.barData}>
                        <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="finance-2-title">Despesas</h3>
                    <span className="finance-2-description bg-[#ffedde] text-[#F97316] px-2 py-1 rounded-full">+1.75%</span>
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.barData}>
                        <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
