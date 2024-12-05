"use client"

import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { useState } from "react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="w-full relative">
            <div className="h-[60px] max-w-[1280px] mx-auto flex justify-between items-center px-4 sm:h-[50px] md:px-8 mt-[40px]">
                {/* logo */}
                <Image
                    src="/landingPage/logo-horizontal.svg"
                    alt="Logo"
                    width={280}
                    height={72}
                    className="w-[200px] md:w-[280px]" // Responsive logo size
                />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex w-[350px] h-[24px] justify-between gap-6 text-base text-zinc-800 navbar-link">
                    <a href="#animais">Animais para adoção</a>
                    <a href="#doacoes">Doações</a>
                    <a href="#agenda">Agenda</a>
                </nav>

                {/* Desktop Button */}
                <Button className="hidden md:flex w-[176px] h-[40px] rounded-tl-lg p-2 px-4 items-center gap-2">
                    <FontAwesomeIcon icon={faPaw} className="w-5 h-5" />
                    Quero adotar
                </Button>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-zinc-800 p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontAwesomeIcon 
                        icon={isMenuOpen ? faXmark : faBars} 
                        className="w-6 h-6"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-[100%] left-0 right-0 bg-white shadow-lg md:hidden z-50">
                    <nav className="flex flex-col w-full px-4 py-4 gap-4">
                        <a href="#animais" className="text-zinc-800 py-2 border-b border-gray-100">
                            Animais para adoção
                        </a>
                        <a href="#doacoes" className="text-zinc-800 py-2 border-b border-gray-100">
                            Doações
                        </a>
                        <a href="#agenda" className="text-zinc-800 py-2 border-b border-gray-100">
                            Agenda
                        </a>
                        <Button className="w-full h-[40px] rounded-tl-lg p-2 px-4 flex items-center justify-center gap-2 mt-2">
                            <FontAwesomeIcon icon={faPaw} className="w-5 h-5" />
                            Quero adotar
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
