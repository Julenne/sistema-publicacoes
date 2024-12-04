'use client';
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from 'next/navigation';
import { IoBookmarkOutline, IoSearch } from "react-icons/io5";
import { FaBookOpen, FaBookmark } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { getDados,getUsuariosPorPublicacao, getInicioPublicacoes, getPublicacoesPorAutor, getPublicacoesPorLocal, getPublicacoesPorPalavraChave, getTotalPublicacoesPorAutor } from "../services/service";

export default function Page() {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState("Selecione");
  const [pesquisa, setPesquisa] = useState("");
  const [resultados, setResultados] = useState([]);
  const [salvamentos, setSalvamentos] = useState({});
  const [activeDiv, setActiveDiv] = useState(1);

  useEffect(() => {
    getDados()
      .then((res) => setDados(res.data))
      .catch((err) => console.error("Erro ao buscar dados:", err));

    if (filtro === "Selecione") {
      buscarInicio();
    }
  }, [filtro]);

  const buscarInicio = async () => {
    try {
      const response = await getInicioPublicacoes();
      setResultados(response.data);

      // Carregar salvamentos para cada publicação
      const salvamentosPromises = response.data.map(async (item) => {
        try {
          const res = await getUsuariosPorPublicacao(item.id_publicacao);
          return { id_publicacao: item.id_publicacao, total: res.data.total || 0 };
        } catch {
          return { id_publicacao: item.id_publicacao, total: 0 }; // Em caso de erro
        }
      });
      
      const salvamentosRes = await Promise.all(salvamentosPromises);
      const salvamentosMap = salvamentosRes.reduce((acc, cur) => {
        acc[cur.id_publicacao] = cur.total;
        return acc;
      }, {});
      setSalvamentos(salvamentosMap);
    } catch (error) {
      console.error("Erro ao buscar dados iniciais:", error);
    }
  };

  const handleBuscar = async () => {
    if (filtro !== "Selecione" && !pesquisa) {
      alert("Por favor, insira um termo de pesquisa.");
      return;
    }

    try {
      let response;
      if (filtro === "Palavra-chave") {
        response = await getPublicacoesPorPalavraChave(pesquisa);
      } else if (filtro === "Autor") {
        response = await getPublicacoesPorAutor(pesquisa);
      } else if (filtro === "Local") {
        response = await getPublicacoesPorLocal(pesquisa);
      }else if (filtro === "Salva"){
        response = await getArtigosSalvosPorUsuario();
      }
      setResultados(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao buscar dados. Verifique a conexão com o servidor.");
    }
  };


  return (
    <div className="flex flex-row h-screen font-mono">
      <div className="flex flex-1 basis-1/4 flex-col items-center bg-verde">
        <div className="flex justify-center flex-col flex-1">
          <div className="border-b-2 w-full text-center pb-32">
            <div className="w-full text-5xl">
              Joel Santos
            </div>
            <div className="w-full text-2xl">
              @joelsantos
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
            <select name="Filtrar"
              className="p-3 pr-28 h-3/6 ml-2 mt-4 pb-8 w-1/5 rounded-full drop-shadow-xl bg-slate-50"
              onChange={(e) => setFiltro(e.target.value)}>
              <option>Selecione</option>
              <option>Palavra-chave</option>
              <option>Autor</option>
              <option>Local</option>
            </select>
            <input name="pesquisa" onChange={(e) => setPesquisa(e.target.value)} rows={1} placeholder="Pesquisar" className="w-4/5 p-2 pl-5 m-4 drop-shadow-xl rounded-full" />
            <button onClick={handleBuscar} name="entrar" className="w-42 bg-verde px-8 rounded-full m-5">Buscar</button>
          </div>

          <div className="flex flex-col divide-y-2">

            {resultados.length > 0 ? (
              resultados.map((item, index) => (
                <div key={index} className="p-4">
                  {filtro === "Selecione" && item.titulo && <div key={index} className=" flex flex-row justify-between  my-4">
                    <div className="flex flex-col mx-10 p-2">
                      <div>
                        {item.titulo}
                      </div>
                      <div className="">
                        <a  href={item.url_leitura}>Acessar publicação</a>
                      </div>
                    </div>
                    <div className=" mx-14 pt-2 flex flex-row">
                      <IoBookmarkOutline size="2em" />
                      <p className="text-lg">{salvamentos[item.id_publicacao] || 0}</p>
                    </div>
                  </div>}
                  {filtro === "Palavra-chave" && item.titulo && <div key={index} className=" flex flex-row justify-between  my-4">
                    <div className="flex flex-col mx-10 p-2">
                      <div>
                        {item.titulo}
                      </div>
                      <div>
                        <a href={item.url_leitura}>Acessar publicação</a>
                      </div>
                    </div>
                    <div className=" mx-14 pt-2 flex flex-row">
                      <IoBookmarkOutline size="2em" />
                      <p className="text-lg">{salvamentos[item.id_publicacao] || 0}</p>
                    </div>
                  </div>}
                  {filtro === "Autor" && item.titulo && <div key={index} className=" flex flex-row justify-between  my-4">
                    <div className="flex flex-col mx-10 p-2">
                      <div>
                        {item.titulo}
                      </div>
                      <div>
                        <a href={item.url_leitura}>Acessar publicação</a>
                      </div>
                    </div>
                    <div className=" mx-14 pt-2 flex flex-row">
                      <IoBookmarkOutline size="2em" />
                      <p className="text-lg">{salvamentos[item.id_publicacao] || 0}</p>
                    </div>
                  </div>}
                  {filtro === "Local" && item.nome_local && <div key={index} className=" flex flex-row justify-between  my-4">
                    <div className="flex flex-col mx-10 p-2">
                      <div>
                        {item.nome_local}
                      </div>
                      <div>
                        {item.tipo_local}
                      </div>
                    </div>
                    <div className=" mx-14 pt-2 flex flex-row">
                      <IoBookmarkOutline size="2em" />
                      <p className="text-lg">{salvamentos[item.id_publicacao] || 0}</p>
                    </div>
                  </div>}
                </div>
              ))
            ) : (
              <p className="text-center">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      }

      {activeDiv === 2 && filtro === "Salva" &&
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
                <FaBookmark size="2em" />
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
                <FaBookmark size="2em" />
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
                <FaBookmark size="2em" />
                <p className="text-lg">25</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}