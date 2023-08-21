'use client';

import {Authenticated} from "@/hooks/authenticated";
import {redirect} from "next/navigation";

export default function Home() {

    const authenticated = Authenticated()

    if (!authenticated){
         redirect('/login')
    }

  return (
    <div className="conteudo">
      <h2>Dashboard</h2>
    </div>
  )
}
