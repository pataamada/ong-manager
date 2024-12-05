import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"

export function AvailablePets() {
    return (
        <div className="text-center py-8">
            <h3 className="text-4xl font-bold">
                Conheça nossos
                <span className="text-[#10B981]"> peludos!</span>
            </h3>
            <p className="text-2xl mt-4 text-gray-600">Eles adoram carinho e merecem amor!</p>

            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 mt-8">
                <div className="flex-1 max-w-[400px] bg-white p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {["Gato", "Castrada", "Fêmea"].map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-black text-sm font-medium px-4 py-2 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nina</h2>
                    <p className="text-gray-600 mb-4">
                        Nina é uma gata adorável, cheia de energia e amor para compartilhar. Ela está à
                        procura de um lar cheio de carinho!
                    </p>

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

                <div className="w-[350px] h-[450px] rounded-[16px] bg-gray-200 overflow-hidden">
                    <img
                        src="/adopt-puppies/Card.png"
                        alt="Imagem principal do bichinho"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}
