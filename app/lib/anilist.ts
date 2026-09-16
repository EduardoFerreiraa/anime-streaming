export type Anime = {
  id: number;
  title: {
    romaji: string;
  };
  episodes: number | null;
  season: string | null;
  seasonYear: number | null;
  coverImage: {
    large: string;
  };
};

type AniListPageResponse = {
  data: {
    Page: {
      pageInfo: {
        hasNextPage: boolean;
        currentPage: number;
        lastPage: number;
      };
      media: Anime[];
    };
  };
  errors?: { message: string }[];
};

const LIST_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
        lastPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
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

export async function getAnimeList(page = 1, perPage = 20) {
  const resposta = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: LIST_QUERY,
      variables: { page, perPage },
    }),
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar animes: ${resposta.status}`);
  }

  const dados: AniListPageResponse = await resposta.json();

  if (dados.errors?.length) {
    throw new Error(dados.errors[0].message);
  }

  return dados.data.Page;
}