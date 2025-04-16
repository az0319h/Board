import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
    return(
        <div 
            className="
            min-h-screen
            flex flex-col 
            bg-regular-black text-regular-white
        ">
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Header />
                    <main className="flex-1 px-4 md:px-6 w-full xl:max-w-screen-xl xl:mx-auto">
                        <Outlet />
                    </main>
                    {/* Footer */}
                </QueryClientProvider>
            </AuthContextProvider>
        </div>
    )
}