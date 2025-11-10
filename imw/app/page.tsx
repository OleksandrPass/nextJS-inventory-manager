import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await stackServerApp.getUser();
    if (user) {
         redirect("/dashboard");
     }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 ">Welcome to Inventory Management App</h1>
                    <p className="text-lg text-center text-gray-600 mb-12">
                        A powerful yet easy-to-use web application designed to help businesses efficiently track, organize, and manage their stock.<br/>
                        Enabling real-time inventory monitoring, automatic stock updates, low-stock alerts.
                    </p>
                </div>
                    <div className="flex gap-4 justify-center">
                        <Link href="/sign-in" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                            Sign In
                        </Link>
                    </div>
            </div>
        </div>
    )
}