import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"

export function Partners() {
    return (
        <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-2">Parceiros</h3>
            <p className="mb-8">Conheça os parceiros da ONG</p>
            
            <div className="flex justify-center gap-6">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="bg-gray-300 border border-gray-400 rounded-lg p-4 flex flex-col items-center w-48">
                        <img
                            src={`/partners/card-parceiro-${num}.png`}
                            alt={`Parceiro ${num}`}
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <strong>Parceiro {num}</strong>
                        <p className="text-sm text-gray-600">Front-end UX</p>
                        <div className="flex mt-2 gap-2">
                            <a href="#xx" className="text-blue-500">
                                <FontAwesomeIcon icon={faLinkedinIn} size="lg" className="w-6 h-6 text-black" />
                            </a>
                            <a href="#xx" className="text-gray-800">
                                <FontAwesomeIcon icon={faGithub} size="lg" className="w-6 h-6 text-black" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6 py-6 mx-auto">
                <img
                    src="/partners/ifal-icon.png"
                    alt="Logo Parceiro 1"
                    className="w-[200.38px] h-[175.83px]"
                />
                <img
                    src="/partners/logo.png"
                    alt="Logo Parceiro 2"
                    className="w-[200.38px] h-[175.83px]"
                />
                <img
                    src="/partners/qualifica-tech.png"
                    alt="Logo Parceiro 3"
                    className="w-[260.44px] h-[149.4px]"
                />
            </div>
        </div>
    )
}
