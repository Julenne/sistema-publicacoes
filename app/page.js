'use client';
import Image from "next/image";
import { redirect, useRouter } from 'next/navigation';
export default function Home() {
  return (
    <div className="flex flex-col items-center mt-[10%] font-mono">
      <div className="text-7xl font-mono">
          PubSearch
      </div>
      <label>
        Login:
      <input name="login" rows={1} className="w-42 p-2 m-4 border-2 border-zinc-800"/>
      </label>
      <label>
        Senha:
      <input name="senha" rows={1} className="w-42 p-2 m-4 border-2 border-zinc-800"/>
      </label>
      <button name="entrar" className="w-42 bg-blue-700 px-12 py-2 rounded m-2">Entrar</button>
      <button onClick={() => redirect('/homepage')} name="cadastrar" className="w-42 bg-blue-700 px-9 py-2 rounded m-2">Cadastrar</button>
    </div>
  );
}
