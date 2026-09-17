import Header from "../components/layout/header";
import AnimeCard from "../components/ui/animeCard";
import { getAnimeList } from "../lib/anilist";

const categoriaStyle =
  "cursor-pointer border border-zinc-800 bg-[#070A0E] py-2 px-5 rounded-3xl transition-all duration-200 hover:bg-orange-500";

function formatarTemporada(season: string | null, year: number | null) {
  if (!year) return "N/A";
  return season ? `${season} ${year}` : `${year}`;
}

export default async function Categorias() {
  let animes: Awaited<ReturnType<typeof getAnimeList>>["media"] = [];

  try {
    const resultado = await getAnimeList(1, 20);
    animes = resultado.media;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Header />
      <section className="pt-30 px-30">
        <h1 className="text-[20px] font-bold text-orange-500 uppercase">
          Categorias
        </h1>
        <p className="text-5xl font-bold pt-2">Explore por Genêro</p>
        <p className="w-[30%] text-[17px] text-zinc-200 pt-2">
          Descubra animes incríveis em diversas categorias. Encontre o próximo
          anime que vai te conquistar!
        </p>
        <nav className="pt-10">
          <ul className="flex justify-start items-center gap-6">
            <li className={categoriaStyle}>Todos</li>
            <li className={categoriaStyle}>Ação</li>
            <li className={categoriaStyle}>Comédia</li>
            <li className={categoriaStyle}>Drama</li>
            <li className={categoriaStyle}>Fantasia</li>
            <li className={categoriaStyle}>Terror</li>
            <li className={categoriaStyle}>Romance</li>
            <li className={categoriaStyle}>Sci-fi</li>
            <li className={categoriaStyle}>Slice of life</li>
            <li className={categoriaStyle}>Sobrenatural</li>
            <li className={categoriaStyle}>Esporte</li>
            <li className={categoriaStyle}>Suspense</li>
          </ul>
        </nav>

        <div className="flex justify-between pt-10">
          <h2 className="text-3xl font-black">Todos os animes</h2>
          <button className="bg-zinc-900 rounded-2xl mr-10 p-3 px-7 cursor-pointer hover:bg-white hover:text-black transition">
            Mais populares
          </button>
        </div>

        {animes.length === 0 ? (
          <p className="pt-5">
            Não foi possível carregar os animes no momento.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-5">
            {animes.map((anime) => (
              <AnimeCard
                key={anime.id}
                nome={anime.title.romaji}
                episodio={String(anime.episodes ?? "N/A")}
                temporada={formatarTemporada(anime.season, anime.seasonYear)}
                imagem={anime.coverImage.large}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
