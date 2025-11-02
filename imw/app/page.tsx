import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await stackServerApp.getUser();
    if (user) {
         redirect("/dashboard");
     }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/sign-in"
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
            </div>
        </div>
    );
}