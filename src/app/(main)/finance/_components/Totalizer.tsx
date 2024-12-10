import Image from "next/image";
import React from "react";

export interface IPropsTotalizer {
    type: 'total' | 'donations' | 'expenses'
    label: string
    value: string
}

export const Totalizer = ({type, label, value}: IPropsTotalizer) => {
  return (
    <div className="flex w-full p-6 gap-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E7]">
      <div
        className={`flex justify-center items-center rounded h-[56px] w-[56px] ${type === 'expenses' ? 'bg-[#FEE2E2]' : type === 'donations' ? 'bg-[#D1FAE5]' : 'bg-[#F4F4F5]' }`}
      >
        <Image
          src={`/finance/${type === 'expenses' ? 'trending-down' : type === 'donations' ? 'trending-up' : 'piggy-bank' }.svg`}
          width={32}
          height={32}
          priority
          alt="ícone"
        />
      </div>
      <div>
        <div className={`font-normal text-base text-[#52525B]`}>{label}</div>
        <div className={`font-bold text-2xl ${type === 'expenses' ? 'text-[#EF4444]' : type === 'donations' ? 'text-[#34D399]' : 'text-[#09090B]' }`}>{value}</div>
      </div>
    </div>
  );
};
