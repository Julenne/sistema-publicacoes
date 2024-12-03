'use client';
import Image from "next/image";
import { redirect, useRouter } from 'next/navigation';
export default function Home() {
  return (
    <div className="flex flex-col items-center mt-[10%] font-mono">
      <div className="text-7xl font-mono">
          PubSearch
      </div>
      <div className="text-3xl font-mono">
          Cadastre-se!
      </div>
      <label>
      <input name="login" rows={1} placeholder="nickname" className="pl-6 drop-shadow-xl rounded-full w-42 p-2 m-4"/>
      </label>
      <label>
      <input name="senha" rows={1} placeholder="senha" className="pl-6 drop-shadow-xl rounded-full w-42 p-2 m-4"/>
      </label>
      <button onClick={() => redirect('/homepage')} name="entrar" className="w-42 bg-verde px-12 py-2 rounded m-2">Registre-se</button>
      <button onClick={() => redirect('/')} name="cadastrar" className="hover:underline">Faça o seu login!</button>
    </div>
  );
}
