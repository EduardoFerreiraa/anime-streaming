export type Anime = {
  mal_id: number;
  title: string;
  episodes: number | null;
  season: "winter" | "spring" | "summer" | "fall" | null;
  year: number | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
};

type JikanResponse = {
  data: Anime[];
};

export async function getTopAnimes(limit = 10): Promise<Anime[]> {
  const resposta = await fetch(
    `https://api.jikan.moe/v4/top/anime?limit=${limit}&filter=bypopularity`,
    {
      // cache agressivo é essencial aqui por causa do rate limit
      next: { revalidate: 3600 }, // 1 hora
    },
  );

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar animes: ${resposta.status}`);
  }

  const dados: JikanResponse = await resposta.json();

  return dados.data;
}
