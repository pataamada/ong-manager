import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

export function Volunteers() {
    return (
        <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-2">Nossos voluntários</h3>
            <p className="mb-8 text-gray-600">Conheça quem nos ajuda pessoalmente</p>
            
            <div className="flex justify-center">
                <div className="flex flex-col items-center m-[80px]">
                    <img
                        src="/volunteers/card-voluntario-1.png"
                        alt="Voluntário 1"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <strong>Pedro Santos</strong>
                    <p className="text-sm text-gray-600">Front-end UX</p>
                    <a href="#xx" className="text-blue-500 mt-2">
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
                    </a>
                </div>

                <div className="flex flex-col items-center m-[80px]">
                    <img
                        src="/volunteers/card-voluntario-2.png"
                        alt="Voluntário 2"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <strong>Maria Silva</strong>
                    <p className="text-sm text-gray-600">Front-end UX</p>
                    <a href="#xx" className="text-blue-500 mt-2">
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
                    </a>
                </div>

                <div className="flex flex-col items-center m-[80px]">
                    <img
                        src="/volunteers/card-voluntario-3.png"
                        alt="Voluntário 3"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <strong>João Souza</strong>
                    <p className="text-sm text-gray-600">Front-end UX</p>
                    <a href="#xx" className="text-blue-500 mt-2">
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
                    </a>
                </div>

                <div className="flex flex-col items-center m-[80px]">
                    <img
                        src="/volunteers/card-voluntario-4.png"
                        alt="Voluntário 4"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <strong>Ana Costa</strong>
                    <p className="text-sm text-gray-600">Front-end UX</p>
                    <a href="#xx" className="text-blue-500 mt-2">
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
                    </a>
                </div>
            </div>
        </div>
    )
}
