"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-primary text-white py-8">
            <div className="container mx-auto max-w-screen-2xl flex flex-wrap justify-between items-start gap-12 pl-4 md:pl-20">
                <div className="w-full md:w-96 h-auto flex-shrink-0">
                    <Image
                        src="/landingPage/footer-images/icon.svg"
                        alt="Logo"
                        width={96}
                        height={67}
                        className="mb-4"
                    />
                    <p className="text-paragraph-5 mb-6">
                        Somos a organização não governamental CãoDomínio, um abrigo que trabalha há 30 anos para fornecer assistência a cães e gatos necessitados.
                        Estamos localizados em: Rua 17 de Agosto, 130, Centro, Satuba/AL - CEP 57120-000.
                        Funcionamos de segunda à sexta, das 8 às 18:00.
                    </p>
                    <div className="flex justify-start md:justify-center gap-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-secondary transition-colors"
                        >
                            <Icon icon="mdi:instagram" className="text-2xl" />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-secondary transition-colors"
                        >
                            <Icon icon="basil:facebook-outline" className="text-2xl" />
                        </a>
                        <a
                            href="tel:+5582987654321"
                            className="text-white hover:text-secondary transition-colors"
                        >
                            <Icon icon="bi:telephone" className="text-2xl" />
                        </a>
                    </div>
                </div>

                <div className="flex-1 space-y-6 w-full md:w-auto">
                    <h3 className="text-subtitle-2 mb-4 font-bold">Sessões</h3>
                    <ul className="space-y-2">
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Sobre nós</a></li>
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Conheça nossos peludos</a></li>
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Precisamos da sua ajuda</a></li>
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Transparência</a></li>
                        <li><a href="#volunteers" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Voluntários</a></li>
                        <li><a href="#partners" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Parceiros</a></li>
                    </ul>
                </div>

                <div className="flex-1 space-y-6 w-full md:w-auto">
                    <h3 className="text-subtitle-2 mb-4 font-bold">Menu</h3>
                    <ul className="space-y-2">
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Animais para adoção</a></li>
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Doações</a></li>
                        <li><a href="/#" className="text-paragraph-5 hover:text-secondary transition-colors no-underline">Agenda</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8">
                <p className="text-paragraph-5">
                    Copyright © {new Date().getFullYear()} CãoDomínio.<br />Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
