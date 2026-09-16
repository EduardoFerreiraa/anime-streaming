import Image from "next/image";

type AnimeCardProps = {
  nome: string;
  episodio: string;
  temporada: string;
  imagem: string;
};

export default function AnimeCard({
  nome,
  episodio,
  temporada,
  imagem,
}: AnimeCardProps) {
  const cardAnime =
    "relative cursor-pointer p-2 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-800";

  return (
    <div className={cardAnime}>
      <div className="w-75 h-95">
        <Image
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="w-full rounded-2xl p-5 absolute bottom-0 left-0 bg-linear-to-t from-black/90 to-transparent">
        <h3 className="text-[18px] font-black">{nome}</h3>

        <p className="text-[16px]">
          Episódio {episodio}&nbsp; •&nbsp; T{temporada}
        </p>
      </div>
    </div>
  );
}
