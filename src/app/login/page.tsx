import React from 'react';

import Image from "next/image";
import Link from "next/link";

// import img_login from "@/assets/img-pag-login.png"
// import logo from '@/assets/logo-caodiminio-satuba.png'
// import img_login from '@/assets/img-pagina-login.svg'
// import logo from '@/assets/logo-caodominio-satuba.svg'

const Login = () => {
  return (
    <div className="relative flex flex-col items-center h-screen xl:flex-row">
			<div className="relative bg-green-500">
				<Image
					src={'/img-pagina-login.svg'}
          width={100}
          height={100}
					alt="logo"
					className="h-screen w-screen object-cover"
				/>
      </div>

      <div className="w-full max-w-md p-8 space-y-6">
        <Image
              src={'/logo-caodominio-satuba.svg'}
              width={200}
              height={70}
              alt="logo do cãodominio satuba"
              aria-describedby='imagem com a palavra cãodominio na cor verde, acima da palavra satuba, na cor preta'
              className="mb-20 mx-auto"
            />
        <form className="space-y-8">
          <div className="flex flex-col items-center gap-2 mx-auto">
							<h2 className="text-center">Entre em sua conta</h2>
							<h3 className="text-center">Bem-vindo de volta</h3>
						</div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Senha
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                placeholder="Digite sua senha"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-black-600">
                Lembrar-se
              </label>
            </div>
            <div className="text-sm">
            <Link
              href="/"
              className="font-medium text-green-600 hover:text-green-500 underline"
            >
              Esqueceu a senha?
            </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
