import Image from "next/image";

interface IStepsProps {
    label: string;
    step: number;
    stepsCount: number;
    currentStep: number;
}

export const Steps = ({
    label,
    step,
    stepsCount,
    currentStep,
}: IStepsProps) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center">
                <div
                    className={`relative rounded-lg h-[40px] w-[40px] flex justify-center items-center ${step <= currentStep
                            ? "bg-[#27272A]"
                            : "bg-[#FFFFFF] border-2 border-[#27272A]"
                        }`}
                >
                    <div className="absolute top-11 text-nowrap font-semibold text-sm text-[#27272A]">
                        {label}
                    </div>
                    <div
                        className={`font-semibold text-base ${step <= currentStep ? "text-[#FFFFFF]" : "#27272A"
                            } `}
                    >
                        {step < currentStep ? (
                            <Image
                                src={`/finance/check.svg`}
                                width={16}
                                height={16}
                                priority
                                alt="ícone"
                            />
                        ) : (
                            step
                        )}
                    </div>
                </div>
                {step !== stepsCount && (
                    <div
                        className={`h-[3px] w-[80px] bg-[#27272A] ${step === stepsCount ? "ml-[-0px]" : ""
                            }`}
                    />
                )}
            </div>
        </div>
    );
};
