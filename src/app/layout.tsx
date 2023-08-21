'use client';
import './globals.css'
import {Inter} from 'next/font/google'
import {AuthProvider, useAuth} from "@/context/authContext";
import MiniDrawer from "@/component/sidebar/sidebar";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="pt-br">
        <body>
        <AuthProvider>
            <MiniDrawer/>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
