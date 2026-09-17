"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimeCard from "./animeCard";

type Anime = {
  mal_id: number;
  title: string;
  episodes: number | null;
  temporada: string;
  imagem: string;
};

type AnimeCarouselProps = {
  animes: Anime[];
};

export default function AnimeCarousel({ animes }: AnimeCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const mouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function verificarScroll() {
    const carousel = carouselRef.current;

    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);

    const chegouNoFinal =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5;

    setCanScrollRight(!chegouNoFinal);
  }

  useEffect(() => {
    verificarScroll();

    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.addEventListener("scroll", verificarScroll);

    window.addEventListener("resize", verificarScroll);

    return () => {
      carousel.removeEventListener("scroll", verificarScroll);

      window.removeEventListener("resize", verificarScroll);
    };
  }, []);

  function moverParaEsquerda() {
    carouselRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  }

  function moverParaDireita() {
    carouselRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (!carouselRef.current) return;

    mouseDown.current = true;

    startX.current = event.pageX - carouselRef.current.offsetLeft;

    scrollLeft.current = carouselRef.current.scrollLeft;
  }

  function handleMouseUp() {
    mouseDown.current = false;
  }

  function handleMouseLeave() {
    mouseDown.current = false;
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!mouseDown.current || !carouselRef.current) {
      return;
    }

    event.preventDefault();

    const x = event.pageX - carouselRef.current.offsetLeft;

    const distancia = (x - startX.current) * 0.8;

    carouselRef.current.scrollLeft = scrollLeft.current - distancia;
  }

  return (
    <div className="relative">
      {/* Seta esquerda */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={moverParaEsquerda}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition hover:bg-orange-500"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Cards */}
      <div
        ref={carouselRef}
        className="flex cursor-grab select-none gap-5 overflow-x-auto pb-5 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {animes.map((anime) => (
          <div key={anime.mal_id} className="w-64 shrink-0">
            <AnimeCard
              nome={anime.title}
              episodio={String(anime.episodes ?? "N/A")}
              temporada={anime.temporada}
              imagem={anime.imagem}
            />
          </div>
        ))}
      </div>

      {/* Seta direita */}
      {canScrollRight && (
        <button
          type="button"
          onClick={moverParaDireita}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition hover:bg-orange-500"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
