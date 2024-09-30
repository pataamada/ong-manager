import React from "react"

import Image from "next/image"
import FormLogin from "./form-login"

export default function Login() {
	return (
		<div className="relative flex flex-col lg:items-center h-screen lg:flex-row">
			<div className="relative bg-green-500">
				<Image
					src={"/img-pagina-login.svg"}
					width={100}
					height={100}
					alt="iamgem da página de login"
					className="hidden lg:block h-screen w-screen object-cover"
				/>
			</div>

			<div className="absolute lg:static top-1/2 left-1/2 lg:left-auto -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 lg:-translate-y-0 flex w-2/3 lg:p-0 flex-col lg:mx-24 lg:w-2/6 lg:h-screen justify-center gap-4">
				<Image
					src={"/logo-caodominio-satuba.svg"}
					width={200}
					height={70}
					alt="logo do cãodominio satuba"
					className="mb-20 mx-auto"
				/>
				<FormLogin />
			</div>
		</div>
	)
}
