export default async function Teste() {
  const query = `
    query {
      Page(perPage: 10) {
        media(type: ANIME) {
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

  const resposta = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const dados = await resposta.json();

  return <pre>{JSON.stringify(dados, null, 2)}</pre>;
}
