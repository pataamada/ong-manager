import React, { Suspense } from "react";
import FormLogin from "./form-login";

export const dynamic = "force-dynamic";
export default function Login() {
	return (
		<Suspense>
			<FormLogin />
		</Suspense>
	);
}
