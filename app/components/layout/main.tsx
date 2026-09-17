import Bg_anime from "../ui/bg_anime";
import Hero from "../ui/hero";
import AnimeCarousel from "../ui/animeCarousel";
import { getTopAnimes } from "../../lib/jikan";
import { getLancamentos } from "../../lib/anilist";

export default async function Main() {
  let animes: Awaited<ReturnType<typeof getTopAnimes>> = [];
  let lancamentos: Awaited<ReturnType<typeof getLancamentos>> = [];

  try {
    animes = await getTopAnimes(10);
  } catch (error) {
    console.error(error);
  }

  try {
    lancamentos = await getLancamentos(10);
  } catch (error) {
    console.error(error);
  }

  const animesFormatados = animes.map((anime) => ({
    mal_id: anime.mal_id,
    title: anime.title,
    episodes: anime.episodes,
    tipo: "Legendado",
    imagem: anime.images.jpg.large_image_url,
  }));

  const lancamentosFormatados = lancamentos.map((anime) => ({
    mal_id: anime.id,
    title: anime.title.romaji,
    episodes: anime.episodes,
    tipo: "Legendado",
    imagem: anime.coverImage.large,
  }));

  return (
    <main>
      <Bg_anime />

      <Hero />

      <section className="relative bg-zinc-950 p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-orange-500" />

          <h2 className="text-3xl font-black">Em alta</h2>
        </div>

        {animesFormatados.length === 0 ? (
          <p>Não foi possível carregar os animes no momento.</p>
        ) : (
          <AnimeCarousel animes={animesFormatados} />
        )}
      </section>

      <section className="relative bg-zinc-950 p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-orange-500" />

          <h2 className="text-3xl font-black">Lançamentos</h2>
        </div>

        {lancamentosFormatados.length === 0 ? (
          <p>Não foi possível carregar os animes no momento.</p>
        ) : (
          <AnimeCarousel animes={lancamentosFormatados} />
        )}
      </section>
    </main>
  );
}
