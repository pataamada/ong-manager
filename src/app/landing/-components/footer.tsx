import fb_icon from '@/assets/images/fb-icon.svg';
import insta_icon from '@/assets/images/insta-icon.svg';
import twi_icon from '@/assets/images/twi-icon.svg';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8 rounded-t-[40px] mx-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Logo and Social Media Section */}
          <div className="col-span-1 md:col-span-4 md:mr-16">
            <span>
              <Image
                width={100}
                height={100}
                src="/pata-amada-logo.png"
                alt="Logo Pata Amada"
                className="w-32 mb-4"
              />
            </span>
            <p className="footer-description mb-4">
              Nossa missão é resgatar, cuidar e encontrar lares amorosos para animais abandonados.
            </p>
            <div>
              <div className="flex flex-row gap-4 mt-4 items-center">
                <a href="https://www.instagram.com/grupopataamada/" className="text-gray-400 hover:text-white">
                  <Image src={insta_icon} alt="Logo do Instagram" width={30} height={30} />
                </a>
                <a href="https://twitter.com/grupopataamada" className="text-gray-400 hover:text-white">
                  <Image src={twi_icon} alt="Logo do Twitter" width={28} height={28} />
                </a>
                <a href="https://www.facebook.com/grupopataamada" className="text-gray-400 hover:text-white">
                  <Image src={fb_icon} alt="Logo do Facebook" width={30} height={30} />
                </a>
              </div>
            </div>
          </div>

          {/* Links and Contact Section */}
          <div className="col-span-1 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="md:ml-12">
                <h4 className="footer-heading mb-4">Links</h4>
                <ul className="space-y-2">
                  <li><a href="#about" className="footer-subheading hover:text-zinc-400">Sobre Nós</a></li>
                  <li><a href="#adopt" className="footer-subheading hover:text-zinc-400">Adoção</a></li>
                  {/* <li><a href="#" className="footer-subheading hover:text-zinc-400">Campanhas</a></li> */}
                  <li><a href="#events" className="footer-subheading hover:text-zinc-400">Eventos</a></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading mb-4">Contato</h4>
                <ul className="footer-subheading text-zinc-400 space-y-2">
                  <li>contato@grupopataamada.com</li>
                  <li>Maceió, Alagoas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="footer-description text-center text-sm">
            Razão Social: ASSOCIACAO CANIL - GATIL LAR TEMPORARIO SAO FRANCISCO DE ASSIS. CNPJ: 23.871.428/0001-05.
          </p>
          <p className="footer-description text-center text-sm">
            {new Date().getFullYear()} Grupo Pata Amada. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}