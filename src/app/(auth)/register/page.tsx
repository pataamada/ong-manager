import { isUserAuthenticated} from "@/lib/firebase/firebase-admin"
import { redirect } from "next/navigation"

import FormRegister from "./form-register";

export default async function RegisterUser() {

    const isAutheticated = await isUserAuthenticated()
    if (isAutheticated) return redirect("/dashboard")
    return (
     <FormRegister/>
    );
}

