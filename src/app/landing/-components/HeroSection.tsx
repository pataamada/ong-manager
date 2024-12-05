import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"

export function HeroSection() {
    return (
        <>
            <div className="relative flex flex-col lg:flex-row items-center px-4 lg:px-16 mt-16 ml-[240px]">
                <div className="flex w-full">
                    <div className="flex flex-col items-start gap-8 max-w-[50%] ml-4 pt-[10%]">
                        <p className="text-xl text-gray-600 text-center mx-auto">
                            Transforme a vida de um animal.
                        </p>
                        <h3 className="text-4xl font-bold text-[#27272A] leading-tight text-left break-words max-w-[600px]">
                            Adote ou ajude um peludo <br /> em busca de um novo lar!
                        </h3>
                        <div className="flex flex-row gap-4 mt-2 text-center mx-auto">
                            <Button className="w-44 h-10 bg-[#10B981] text-white rounded-tl-lg px-4 flex items-center gap-2 cursor-default">
                                <FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
                                Quero adotar!
                            </Button>
                            <Button className="w-44 h-10 bg-white text-[#10B981] border-2 border-[#10B981] rounded-tl-lg px-4 flex items-center gap-2 cursor-default hover:bg-gray-100">
                                <FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
                                Apadrinhar
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 max-w-[50%] relative">
                        <img
                            src="/home/Vector.svg"
                            alt="Icon"
                            className="w-[500px] h-[500px] object-contain mb-4 relative z-10"
                        />
                        <div className="absolute z-20 transform translate-x-[150px] translate-y-[320px]">
                            <img
                                src="/home/Groups.svg"
                                alt="QR Code"
                                className="w-[200px] h-[200px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="text-[28px] text-[#27272A] mt-6 leading-relaxed text-center max-w-[1407px] mx-auto px-4 lg:px-16">
                <p>A Cão Domínio é uma ONG dedicada a resgatar, cuidar e encontrar lares</p>
                <p>
                    amorosos para cães abandonados.
                    <span className="text-[#10B981] font-bold"> Junte-se a nós nessa missão!</span>
                </p>
            </div> */}
        </>
    )
}
