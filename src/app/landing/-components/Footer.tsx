"use client"

// import { Icon } from "@iconify/react"
// import Image from "next/image"

/* As classes de texto já estão definidas no global.css, pra aplicar Subtitle/Subtitle 2, por exemplo, é so colocar text-subtitle-2  */

export function Footer() {
    return (
        <footer className="bg-primary text-white py-8">
            <div className="container mx-auto max-w-[1440px]">
 
                    {/* <Image
                        src="/landingPage/footer-images/icon.svg"
                        alt="Logo"
                        width={96}
                        height={67}
                        className="mb-4"
                    /> */}

                    <p className="text-center text-paragraph-5">
                    Copyright © {new Date().getFullYear()} CãoDomínio.<br/>Todos os direitos reservados.
                    </p>
            </div>
        </footer>
    )
}