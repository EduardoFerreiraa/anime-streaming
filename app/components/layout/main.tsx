import Bg_anime from "../ui/bg_anime";
import Hero from "../ui/hero";
import AnimeCarousel from "../ui/animeCarousel";
import { getTopAnimes } from "../../lib/jikan";

const SEASON_PT: Record<string, string> = {
  winter: "Inverno",
  spring: "Primavera",
  summer: "Verão",
  fall: "Outono",
};

function formatarTemporada(season: string | null, year: number | null) {
  if (!season || !year) {
    return "N/A";
  }

  return `${SEASON_PT[season] ?? season} ${year}`;
}

export default async function Main() {
  let animes: Awaited<ReturnType<typeof getTopAnimes>> = [];

  try {
    animes = await getTopAnimes(10);
  } catch (error) {
    console.error(error);
  }

  const animesFormatados = animes.map((anime) => ({
    mal_id: anime.mal_id,
    title: anime.title,
    episodes: anime.episodes,
    temporada: formatarTemporada(anime.season, anime.year),
    imagem: anime.images.jpg.large_image_url,
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
    </main>
  );
}
