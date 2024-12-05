export function HowToHelp() {
    return (
        <div className="bg-[#F4F4F5] px-4 lg:px-16 py-8">
            <h2 className="text-3xl font-bold text-[#27272A] mb-8 text-center">
                Como <span className="font-bold">ajudar o Cãodomínio?</span>
            </h2>

            <div className="flex items-start justify-between gap-8">
                <div className="flex-1 flex justify-end pr-8">
                    <img
                        src="/how-to-help/img-como-ajudar.png"
                        alt="Como ajudar o caodomínio"
                        className="w-[822px] h-[585px] object-contain rounded-lg"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-8 mt-9">
                    <div className="flex items-center gap-4">
                        <img
                            src="/how-to-help/como-ajudar-1.svg"
                            alt="como ajudar"
                            className="w-[110px] h-[100px]"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-[#27272A]">
                                <span className="text-[#10B981] font-bold">Adote</span> um animal!
                            </h3>
                            <p className="text-gray-600">
                                Transforme a vida de um peludo e encontre um amigo fiel para sempre!
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src="/how-to-help/como-ajudar-2.svg"
                            alt="como ajudar"
                            className="w-[110px] h-[100px]"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-[#27272A]">
                                <span className="text-[#10B981] font-bold">Doe</span> qualquer quantia
                            </h3>
                            <p className="text-gray-600">
                                Toda doação conta! Com sua ajuda, garantimos amor e cuidados aos animais.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src="/how-to-help/como-ajudar-3.svg"
                            alt="como ajudar"
                            className="w-[110px] h-[100px]"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-[#27272A]">
                                <span className="text-[#10B981] font-bold">Apadrinhe</span> um animal!
                            </h3>
                            <p className="text-gray-600">
                                Ajude a cuidar à distância de um bichinho, oferecendo suporte conínuo.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src="/how-to-help/como-ajudar-4.svg"
                            alt="como ajudar"
                            className="w-[110px] h-[100px]"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-[#27272A]">
                                <span className="text-[#10B981] font-bold">Voluntarie-se</span> e ajude o
                                Cãodomínio
                            </h3>
                            <p className="text-gray-600">
                                Doe seu tempo e faça a diferença diretamente no nosso abrigo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
