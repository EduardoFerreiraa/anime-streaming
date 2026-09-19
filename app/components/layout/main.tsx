import Bg_anime from "../ui/bg_anime";
import Hero from "../ui/hero";
import AnimeCarousel from "../ui/animeCarousel";
import { animes } from "@/app/data/animes";

export default function Main() {
  return (
    <main>
      <Bg_anime />

      <Hero />

      {/* EM ALTA */}
      <section className="relative bg-zinc-950 p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-orange-500" />

          <h2 className="text-3xl font-black">Em alta</h2>
        </div>

        <AnimeCarousel animes={animes} />
      </section>

      {/* LANÇAMENTOS */}
      <section className="relative bg-zinc-950 p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-orange-500" />

          <h2 className="text-3xl font-black">Lançamentos</h2>
        </div>

        <AnimeCarousel animes={animes} />
      </section>
    </main>
  );
}
