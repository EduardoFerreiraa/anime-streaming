export type Anime = {
  id: number;
  title: {
    romaji: string;
  };
  episodes: number | null;
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  coverImage: {
    large: string;
  };
};

type AniListResponse = {
  data: {
    Page: {
      media: Anime[];
    };
  };
  errors?: { message: string }[];
};

const QUERY = `
  query ($perPage: Int) {
    Page(perPage: $perPage) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        episodes
        season
        seasonYear
        coverImage {
          large
        }
      }
    }
  }
`;

export async function getTrendingAnimes(perPage = 10): Promise<Anime[]> {
  const resposta = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { perPage },
    }),
    // cacheia por 1 hora — ajuste conforme sua necessidade
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar animes: ${resposta.status}`);
  }

  const dados: AniListResponse = await resposta.json();

  if (dados.errors?.length) {
    throw new Error(dados.errors[0].message);
  }

  return dados.data.Page.media;
}