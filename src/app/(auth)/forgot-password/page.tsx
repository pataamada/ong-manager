
import { isUserAuthenticated} from "@/lib/firebase/firebase-admin"
import { redirect } from "next/navigation"

import FormForgotPassword from "./form-forgot";

export default async function ForgotPassword() {

    const isAutheticated = await isUserAuthenticated()
    if (isAutheticated) return redirect("/dashboard")
    return (
     <FormForgotPassword/>
    );
}
