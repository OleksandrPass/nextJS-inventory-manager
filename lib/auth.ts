import {stackServerApp} from "../imw/stack/server";
import {redirect} from "next/navigation";


export async function getCurrentUser() {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect("/sign-in");
    }

    return user;
}