export function OurStory() {
    return (
        <div className="flex items-center justify-between gap-8 px-4 lg:px-16 py-8 pt-[20%] pb-[15%]">
            <div className="flex-1">
                <img
                    src="/our-story/img-nossa-historia.png"
                    alt="Imagem Nossa Historia"
                    className="w-full h-auto"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#27272A] mb-4 text-center">
                    Um pouco da nossa <span className="text-[#10B981] font-bold">história</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                    A Cão Domínio começou há mais de 30 anos, quando um grupo de apaixonados por animais
                    se uniu para cuidar de cães abandonados, sem condições de sobreviver nas ruas. Em um
                    terreno cedido pela prefeitura, a missão de resgatar e proteger esses animais se
                    tornou o propósito de nossas vidas.
                </p>
            </div>
        </div>
    )
}
