import Header from "../components/layout/header";
import AnimeCard from "../components/ui/animeCard";
import { getAnimeList } from "../lib/anilist";
import Image from "next/image";

const categoriaStyle =
  "cursor-pointer rounded-3xl border border-zinc-800 bg-[#070A0E] px-5 py-2 transition-all duration-200 hover:bg-orange-500";

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
    <div className="relative min-h-screen bg-zinc-950">
      {/* Imagem de fundo */}
      <div className="absolute left-0 top-0 h-187.5 w-full">
        <Image
          src="/img/fundo-categoria.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay + fade para o fundo */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/80 to-zinc-950" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-20">
        <Header />

        <section className="px-30 pt-30">
          <h1 className="text-[20px] font-bold uppercase text-orange-500">
            Categorias
          </h1>

          <p className="pt-2 text-5xl font-bold">Explore por Genêro</p>

          <p className="w-[30%] pt-2 text-[17px] text-zinc-200">
            Descubra animes incríveis em diversas categorias. Encontre o próximo
            anime que vai te conquistar!
          </p>

          <nav className="pt-10">
            <ul className="flex items-center justify-start gap-6">
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

            <button className="mr-2 cursor-pointer rounded-2xl bg-zinc-900 p-3 px-7 transition hover:bg-white hover:text-black">
              Mais populares
            </button>
          </div>

          {animes.length === 0 ? (
            <p className="pt-5">
              Não foi possível carregar os animes no momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-5 pt-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {animes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  nome={anime.title.romaji}
                  episodio={String(anime.episodes ?? "N/A")}
                  tipo={formatarTemporada(anime.season, anime.seasonYear)}
                  imagem={anime.coverImage.large}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
