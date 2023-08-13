'use client';

import Image from 'next/image'
import {Authenticated} from "@/hooks/authenticated";
import {redirect} from "next/navigation";

export default function Home() {

    const authenticated = Authenticated()

    if (!authenticated){
         redirect('/login')
    }

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}
