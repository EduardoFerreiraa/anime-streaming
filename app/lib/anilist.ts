// lib/anilist.ts

export type Anime = {
  id: number;

  title: {
    romaji: string;
    english: string | null;
  };

  episodes: number | null;

  season: string | null;

  seasonYear: number | null;

  coverImage: {
    medium: string;
    large: string;
    extraLarge: string;
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

  errors?: {
    message: string;
  }[];
};

const ANILIST_URL = "https://graphql.anilist.co";

const LIST_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(
      page: $page
      perPage: $perPage
    ) {
      pageInfo {
        hasNextPage
        currentPage
        lastPage
      }

      media(
        type: ANIME
        isAdult: false
        sort: [POPULARITY_DESC, SCORE_DESC]
      ) {
        id

        title {
          romaji
          english
        }

        episodes

        season

        seasonYear

        coverImage {
          medium
          large
          extraLarge
        }
      }
    }
  }
`;

const LANCAMENTOS_QUERY = `
  query (
    $season: MediaSeason
    $seasonYear: Int
    $perPage: Int
  ) {
    Page(perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
        lastPage
      }

      media(
        type: ANIME
        season: $season
        seasonYear: $seasonYear
        isAdult: false
        sort: [START_DATE_DESC, TRENDING_DESC]
      ) {
        id

        title {
          romaji
          english
        }

        episodes

        season

        seasonYear

        coverImage {
          medium
          large
          extraLarge
        }
      }
    }
  }
`;

async function fazerRequisicao(
  query: string,
  variables: Record<string, unknown>,
) {
  const resposta = await fetch(ANILIST_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    next: {
      revalidate: 3600,
    },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar dados da AniList: ${resposta.status}`);
  }

  const dados: AniListPageResponse = await resposta.json();

  if (dados.errors?.length) {
    throw new Error(dados.errors[0].message);
  }

  return dados.data.Page;
}

function getTemporadaAtual(): string {
  const mes = new Date().getMonth() + 1;

  if (mes <= 3) {
    return "WINTER";
  }

  if (mes <= 6) {
    return "SPRING";
  }

  if (mes <= 9) {
    return "SUMMER";
  }

  return "FALL";
}

export async function getAnimeList(page = 1, perPage = 20) {
  return fazerRequisicao(LIST_QUERY, {
    page,
    perPage,
  });
}

export async function getLancamentos(perPage = 10) {
  const season = getTemporadaAtual();

  const seasonYear = new Date().getFullYear();

  const pagina = await fazerRequisicao(LANCAMENTOS_QUERY, {
    season,
    seasonYear,
    perPage,
  });

  return pagina.media;
}
