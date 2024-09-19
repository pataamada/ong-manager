import React from 'react';

const Login = () => {
  return (
    <div className="flex h-[100vh] w-[100vw]">
      <div className="w-full lg:w-2/3 h-full bg-green-500 flex items-center justify-center relative">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/3 h-full flex items-center justify-center bg-white overflow-y-auto">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-500">CãoDominio</h1>
            <h2 className="text-xl text-gray-600">Satuba</h2>
          </div>
          <h3 className="text-lg font-medium text-gray-700 text-center">Entre em sua conta</h3>
          <p className="text-sm text-gray-400 text-center mb-4">Bem-vindo de volta</p>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
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
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Lembrar-se
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500 underline">
                  Esqueceu a senha?
                </a>
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
    </div>
  );
};

export default Login;
