'use client';
import './globals.css'
import {Inter} from 'next/font/google'
import {AuthProvider, useAuth} from "@/context/authContext";
import Sidebar from "@/component/sidebar/sidebar";
import {useEffect, useState} from "react";


const inter = Inter({subsets: ['latin']})

const menuItems = [
    {
        title: 'Nivel 1',
        subitems: [
            {title: 'Subitem 1', link: '#'},
            {title: 'Subitem 2', link: '#'},
            {title: 'Subitem 3', link: '#'}
        ]
    }
]
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
        <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
