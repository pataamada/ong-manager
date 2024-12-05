import Image from "next/image"

const helpItems = [
    {
        image: "/how-to-help/como-ajudar-1.svg",
        title: "Adote",
        titleComplement: "um animal!",
        description: "Transforme a vida de um peludo e encontre um amigo fiel para sempre com você!"
    },
    {
        image: "/how-to-help/como-ajudar-2.svg",
        title: "Doe",
        titleComplement: "qualquer quantia",
        description: "Toda doação conta! Com sua ajuda, garantimos amor e cuidados aos animais."
    },
    {
        image: "/how-to-help/como-ajudar-3.svg",
        title: "Apadrinhe",
        titleComplement: "um animal!",
        description: "Ajude a cuidar à distância de um bichinho, oferecendo suporte conínuo."
    },
    {
        image: "/how-to-help/como-ajudar-4.svg",
        title: "Voluntarie-se",
        titleComplement: "e ajude o Cãodomínio",
        description: "Doe seu tempo e faça a diferença diretamente no nosso abrigo!"
    }
]

export function HowToHelp() {
    return (
        <div className="py-8 w-full">
          <p className="text-3xl text-[#27272A] mb-8 text-center">
                Como <span className="font-bold">ajudar o Cãodomínio?</span>
            </p>
            <div className="flex items-start justify-between flex-wrap gap-4">
                    <Image
                        src="/how-to-help/img-como-ajudar.png"
                        alt="Como ajudar o caodomínio"
                        width={700}
                        height={585}
                        className="object-contain rounded-lg mx-auto"
                    />

                <div className="flex flex-col gap-8 mx-auto ">
                    {helpItems.map((item, index) => (
                        <div key={`${index}-${item.title}`} className="flex items-center gap-4">
                            <Image
                                src={item.image}
                                alt="como ajudar"
                                width={110}
                                height={100}
                            />
                            <div>
                                <h4 className="font-bold text-lg text-[#27272A]">
                                    <span className="text-[#10B981] font-bold">{item.title}</span> {item.titleComplement}
                                </h4>
                                <p className="text-gray-600 text-sm text-pretty">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
