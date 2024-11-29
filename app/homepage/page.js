'use client';
import { redirect, useRouter } from 'next/navigation';
import { IoBookmarkOutline } from "react-icons/io5";
import { FaBookOpen, FaBookmark } from "react-icons/fa";
export default function Page() {
    return (
      <div className="flex flex-row h-screen">
        <div className="flex flex-1 basis-1/4 flex-col items-center bg-green-500">
          <div className="flex justify-center flex-col flex-1">
            <div className="border-b-2 w-full text-center pb-32">
              <div className="w-full text-5xl">
                Fulano de Tal
              </div>
              <div className="w-full text-2xl">
                @fulanodetal
              </div>
            </div>
            <div className="w-full border-b-2 py-6 flex flex-row text-xl">
              <FaBookOpen size="2em"/>
              <div className="mx-3 mt-1">Todas as Publicações</div>
            </div>
            <div className="w-full border-b-2 py-6 flex flex-row text-xl">
              <FaBookmark size="2em"/>
              <div className="mt-1 mx-3">Salvos</div>
            </div>
            <div className='flex justify-center'>
              <button onClick={() => redirect('/')} name="sair" className="w-42  mt-28 bg-red-600 px-12 py-2 rounded m-2">Sair</button>
            </div>
          </div>
        </div>
        <div className="basis-3/4 bg-orange-500 flex flex-col">
          
          <div className="flex flex-row">
            <select name="Filtrar" className="p-3 h-3/6 ml-2 mt-4 w-1/5 rounded">
              <option>Palavra-chave</option>
              <option>Autor</option>
              <option>Local</option>
            </select>
            <input name="pesquisa" rows={1} className="w-4/5 p-2 m-4 border-2 border-zinc-800 rounded"/>
          </div>

          <div className="flex flex-col divide-y-2 divide-green-500">
            <div className=" flex flex-row justify-between  my-4">
              <div className="flex flex-col mx-10 p-2">
                <div>
                  Publicação Exemplo 1
                </div>
                <div>
                  htttps://linkenormedapublicaçãoexemplo1.com.br
                </div>
              </div>
              <div className=" mx-14 pt-2 flex flex-row">
                <IoBookmarkOutline size="2em"/>
                <p className="text-lg">3</p>
              </div>
            </div>
            <div className=" flex flex-row justify-between  my-4">
              <div className="flex flex-col mx-10 p-2">
                <div>
                  Publicação Exemplo 1
                </div>
                <div>
                  htttps://linkenormedapublicaçãoexemplo1.com.br
                </div>
              </div>
              <div className=" mx-14 pt-2 flex flex-row">
                <IoBookmarkOutline size="2em"/>
                <p className="text-lg">3</p>
              </div>
            </div>
            <div className=" flex flex-row justify-between  my-4">
              <div className="flex flex-col mx-10 p-2">
                <div>
                  Publicação Exemplo 1
                </div>
                <div>
                  htttps://linkenormedapublicaçãoexemplo1.com.br
                </div>
              </div>
              <div className=" mx-14 pt-2 flex flex-row">
                <IoBookmarkOutline size="2em"/>
                <p className="text-lg">25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }