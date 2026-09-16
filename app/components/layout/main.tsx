import Bg_anime from "../ui/bg_anime";
import Hero from "../ui/hero";
import AnimeCard from "../ui/animeCard";

type Anime = {
  mal_id: number;
  title: string;
  episodes: number | null;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

export default async function Main() {
  const resposta = await fetch("https://api.jikan.moe/v4/top/anime");

  const dados: { data: Anime[] } = await resposta.json();

  return (
    <main>
      <Bg_anime />
      <Hero />

      <section className="absolute bg-zinc-950 w-full p-10">
        <h2 className="text-3xl mb-5 font-black">Em alta</h2>

        <div className="flex items-start gap-5">
          {dados.data?.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              nome={anime.title}
              episodio={String(anime.episodes)}
              temporada="?"
              imagem={anime.images.jpg.image_url}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
