'use client';
import React, { useState } from "react";
import { redirect, useRouter } from 'next/navigation';
import { IoBookmarkOutline, IoSearch } from "react-icons/io5";
import { FaBookOpen, FaBookmark } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
export default function Page() {
  const [activeDiv, setActiveDiv] = useState(1);


  return (
    <div className="flex flex-row h-screen font-mono">
      <div className="flex flex-1 basis-1/4 flex-col items-center bg-verde">
        <div className="flex justify-center flex-col flex-1">
          <div className="border-b-2 w-full text-center pb-32">
            <div className="w-full text-5xl">
              Fulano de Tal
            </div>
            <div className="w-full text-2xl">
              @fulanodetal
            </div>
          </div>
          <button className="hover:bg-gray-400" onClick={() => setActiveDiv(1)}>
            <div className="w-full border-b-2 py-6 flex flex-row text-xl pl-5 ">
              <FaBookOpen size="2em" />
              <div className="mx-3 mt-1">Todas as Publicações</div>
            </div>
          </button>
          <button className="hover:bg-gray-400" onClick={() => setActiveDiv(2)}>
            <div className="w-full border-b-2 py-6 flex flex-row text-xl pl-5">
              <FaBookmark size="2em" />
              <div className="mt-1 mx-3">Salvos</div>
            </div>
          </button>
          <div className='flex justify-center'>
            <button onClick={() => redirect('/')} name="sair" className="w-42  mt-28 bg-red-600 px-12 py-2 rounded m-2">Sair</button>
          </div>
        </div>
      </div>
      {activeDiv === 1 &&
        <div className="basis-3/4 flex flex-col">

          <div className="flex justify-center text-4xl mt-4">
            Todas as Publicações
          </div>
          <div className="flex flex-row">
            <select name="Filtrar" className="p-3 pr-28 h-3/6 ml-2 mt-4 pb-8 w-1/5 rounded-full drop-shadow-xl bg-slate-50">
              <option>Palavra-chave</option>
              <option>Autor</option>
              <option>Local</option>
            </select>
            <input name="pesquisa" rows={1} placeholder="Pesquisar" className="w-4/5 p-2 pl-5 m-4 drop-shadow-xl rounded-full" />
          </div>

          <div className="flex flex-col divide-y-2">
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
                <IoBookmarkOutline size="2em" />
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
                <IoBookmarkOutline size="2em" />
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
                <IoBookmarkOutline size="2em" />
                <p className="text-lg">25</p>
              </div>
            </div>
          </div>
        </div>
      }


      {activeDiv === 2 &&
        <div className="basis-3/4 flex flex-col">

          <div className="flex justify-center text-4xl mt-4">
            Salvos
          </div>
          <div className="flex flex-col divide-y-2">
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
                <IoBookmarkOutline size="2em" />
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
                <IoBookmarkOutline size="2em" />
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
                <IoBookmarkOutline size="2em" />
                <p className="text-lg">25</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}