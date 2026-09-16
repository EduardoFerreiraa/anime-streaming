import Bg_anime from "../ui/bg_anime";
import Hero from "../ui/hero";
import AnimeCard from "../ui/animeCard";
import { getTopAnimes } from "../../lib/jikan";

const SEASON_PT: Record<string, string> = {
  winter: "Inverno",
  spring: "Primavera",
  summer: "Verão",
  fall: "Outono",
};

function formatarTemporada(season: string | null, year: number | null) {
  if (!season || !year) return "N/A";
  return `${SEASON_PT[season] ?? season} ${year}`;
}

export default async function Main() {
  let animes: Awaited<ReturnType<typeof getTopAnimes>> = [];

  try {
    animes = await getTopAnimes(10);
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <Bg_anime />
      <Hero />

      <section className="absolute bg-zinc-950 p-10 shadow-">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
          <h2 className="text-3xl font-black">Em alta</h2>
        </div>
        {animes.length === 0 ? (
          <p>Não foi possível carregar os animes no momento.</p>
        ) : (
          <div className="flex items-start gap-5">
            {animes.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                nome={anime.title}
                episodio={String(anime.episodes ?? "N/A")}
                temporada={formatarTemporada(anime.season, anime.year)}
                imagem={anime.images.jpg.large_image_url}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
