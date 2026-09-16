import Image from "next/image";

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

export default async function Teste() {
  const resposta = await fetch("https://api.jikan.moe/v4/top/anime");

  const dados = await resposta.json();

  return <pre>{JSON.stringify(dados, null, 2)}</pre>;
}
