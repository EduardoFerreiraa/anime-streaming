"use client";

import Header from "@/app/components/layout/header";
import PageTransition from "@/app/components/ui/pageTransition";
import { animes } from "@/app/data/animes";

import { Play, Plus, X } from "lucide-react";
import Image from "next/image";

import { use, useEffect, useRef, useState } from "react";

const generos = "rounded-3xl bg-zinc-900 px-4 py-2 text-sm text-zinc-300";

export default function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [temporadaSelecionada, setTemporadaSelecionada] = useState(0);
  const [episodioSelecionado, setEpisodioSelecionado] = useState(0);

  const [videoAberto, setVideoAberto] = useState(false);
  const [videoVisivel, setVideoVisivel] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  const animeEncontrado = animes.find((anime) => anime.id === Number(id));

  useEffect(() => {
    function fecharComEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        fecharVideo();
      }
    }

    if (videoAberto) {
      document.addEventListener("keydown", fecharComEscape);
    }

    return () => {
      document.removeEventListener("keydown", fecharComEscape);
    };
  }, [videoAberto]);

  if (!animeEncontrado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <h1 className="text-2xl font-black">Anime não encontrado.</h1>
      </div>
    );
  }

  const anime = animeEncontrado;
  const temporada = anime.temporadas[temporadaSelecionada];

  function selecionarTemporada(index: number) {
    setTemporadaSelecionada(index);
    setEpisodioSelecionado(0);
  }

  function abrirEpisodio(index: number) {
    const episodio = temporada?.episodios[index];

    if (!episodio) {
      return;
    }

    setEpisodioSelecionado(index);
    setVideoSrc(episodio.arquivo);
    setVideoAberto(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVideoVisivel(true);
      });
    });
  }

  function fecharVideo() {
    setVideoVisivel(false);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }

      setVideoAberto(false);
      setVideoSrc("");
    }, 300);
  }

  function assistirAgora() {
    if (anime.temporadas.length === 0) {
      return;
    }

    const primeiraTemporada = anime.temporadas[0];
    const primeiroEpisodio = primeiraTemporada?.episodios[0];

    if (!primeiroEpisodio) {
      return;
    }

    setTemporadaSelecionada(0);
    setEpisodioSelecionado(0);
    setVideoSrc(primeiroEpisodio.arquivo);
    setVideoAberto(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVideoVisivel(true);
      });
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* HEADER */}
      <div className="relative z-50">
        <Header />
      </div>

      <PageTransition>
        {/* ==================== BANNER ==================== */}
        <section className="relative z-0 h-[70vh] overflow-hidden">
          {/* BANNER */}
          <Image
            src={anime.banner}
            alt={`Banner de ${anime.nome}`}
            fill
            priority
            className="object-cover object-center"
          />

          {/* GRADIENTE */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20" />

          {/* CONTEÚDO */}
          <div className="relative z-10 mx-10 flex h-full items-center">
            <div className="flex w-full justify-between gap-10 p-5">
              {/* ==================== INFORMAÇÕES PRINCIPAIS ==================== */}
              <div className="flex">
                {/* CAPA */}
                <div className="relative h-80 w-55 shrink-0 overflow-hidden rounded-4xl">
                  <Image
                    src={anime.imagem}
                    alt={anime.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTEÚDO */}
                <div className="ml-5">
                  {/* GÊNEROS */}
                  <ul className="flex flex-wrap gap-4">
                    {anime.generos.map((genero) => (
                      <li key={genero} className={generos}>
                        {genero}
                      </li>
                    ))}
                  </ul>

                  <div className="my-3 w-180">
                    {/* NOME */}
                    <h1 className="text-4xl font-black">{anime.nome}</h1>

                    {/* INFORMAÇÕES */}
                    <p className="text-zinc-400">
                      {anime.temporada} - {anime.tipo} - {anime.episodio}{" "}
                      episódios
                    </p>

                    {/* DESCRIÇÃO */}
                    <p className="my-4 text-gray-400">{anime.descricao}</p>

                    {/* BOTÕES */}
                    <div className="flex gap-4">
                      {/* ASSISTIR AGORA */}
                      <button
                        type="button"
                        onClick={assistirAgora}
                        disabled={anime.temporadas.length === 0}
                        className="flex cursor-pointer items-center gap-3 rounded-4xl bg-orange-500 px-8 py-5 font-black text-black transition duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Play size={20} />
                        Assistir agora
                      </button>

                      {/* ADICIONAR À LISTA */}
                      <button
                        type="button"
                        className="flex cursor-pointer items-center gap-3 rounded-4xl bg-zinc-900 px-5 py-5 font-black transition duration-300 hover:bg-zinc-800"
                      >
                        <Plus size={20} />
                        Adicionar na lista
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================== INFORMAÇÕES ==================== */}
              <div className="w-100 shrink-0 rounded-2xl border border-zinc-900 bg-black/50 px-10 py-5 backdrop-blur-sm">
                <h2 className="font-black">Informações</h2>

                <div className="flex justify-between py-5">
                  {/* LABELS */}
                  <div className="flex flex-col gap-3 text-zinc-400">
                    <p>Estúdio</p>
                    <p>Status</p>
                    <p>Tipo</p>
                    <p>Duração</p>
                    <p>Temporada</p>
                  </div>

                  {/* VALORES */}
                  <div className="flex flex-col items-end gap-3 text-zinc-200">
                    <p>{anime.estudio}</p>
                    <p>{anime.status}</p>
                    <p>{anime.tipo}</p>
                    <p>{anime.duracao} min</p>
                    <p>{anime.temporada}</p>
                  </div>
                </div>

                {/* AVALIAÇÃO */}
                <div>
                  <h2 className="font-black">Avaliação</h2>
                  <p>{anime.avaliacao.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== EPISÓDIOS ==================== */}
        <section className="flex justify-center border border-zinc-900 bg-zinc-950 p-5">
          {/* LISTA DE EPISÓDIOS */}
          <div className="flex w-250 flex-col">
            <h1 className="text-[21px]">Episódios</h1>

            {/* TEMPORADAS */}
            {anime.temporadas.length > 0 ? (
              <>
                <ul className="my-2 flex gap-7 text-orange-500">
                  {anime.temporadas.map((temporada, index) => (
                    <li key={temporada.numero}>
                      <button
                        type="button"
                        onClick={() => selecionarTemporada(index)}
                        className={
                          temporadaSelecionada === index
                            ? "font-black"
                            : "text-zinc-500 transition hover:text-zinc-300"
                        }
                      >
                        Temporada {temporada.numero}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* EPISÓDIOS */}
                {temporada ? (
                  <div className="flex flex-col gap-3">
                    {temporada.episodios.map((episodio, index) => {
                      const selecionado = episodioSelecionado === index;

                      return (
                        <div
                          key={episodio.numero}
                          onClick={() => abrirEpisodio(index)}
                          className={`group flex cursor-pointer rounded-2xl border p-2 transition ${
                            selecionado
                              ? "border-orange-500 bg-zinc-900"
                              : "border-zinc-800 hover:border-orange-500"
                          }`}
                        >
                          {/* THUMBNAIL */}
                          <div className="relative mr-5 h-25 w-55 shrink-0 overflow-hidden rounded-2xl bg-zinc-900">
                            <Image
                              src={anime.imagem}
                              alt={`Capa de ${anime.nome}`}
                              fill
                              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* OVERLAY DO PLAY */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                              <Play
                                size={32}
                                fill="white"
                                className="scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                              />
                            </div>
                          </div>

                          {/* NÚMERO */}
                          <div className="flex items-center px-3">
                            <p className="text-xl font-black">
                              {episodio.numero}
                            </p>
                          </div>

                          {/* INFORMAÇÕES */}
                          <div className="ml-5 flex flex-col items-start justify-center">
                            <h3 className="text-[18px] font-black">
                              {episodio.titulo}
                            </h3>

                            <div className="my-1 flex items-center gap-3">
                              <p className="rounded-2xl bg-zinc-900 px-3 py-2">
                                {episodio.audio}
                              </p>

                              <p className="rounded-2xl bg-zinc-900 px-3 py-2">
                                {episodio.qualidade}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="py-5 text-zinc-500">
                    Nenhum episódio cadastrado nesta temporada.
                  </p>
                )}
              </>
            ) : (
              <p className="py-5 text-zinc-500">Nenhum episódio cadastrado.</p>
            )}
          </div>
        </section>
      </PageTransition>

      {/* ==================== PLAYER ==================== */}
      {videoAberto && (
        <div
          className={`fixed inset-0 z-999 flex items-center justify-center bg-black/90 p-8 transition-opacity duration-300 ${
            videoVisivel ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* BOTÃO FECHAR */}
          <button
            type="button"
            onClick={fecharVideo}
            className={`absolute right-8 top-8 z-10 rounded-full bg-zinc-900 p-3 text-white transition-all duration-300 hover:bg-orange-500 hover:text-black ${
              videoVisivel ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <X size={24} />
          </button>

          {/* VÍDEO */}
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            className={`h-[90vh] w-[90vw] rounded-2xl bg-black object-contain shadow-2xl transition-all duration-300 ease-out ${
              videoVisivel ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>
      )}
    </div>
  );
}
