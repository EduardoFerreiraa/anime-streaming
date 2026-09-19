import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

type AnimeCardProps = {
  id: number;
  nome: string;
  episodio: string;
  tipo: string;
  imagem: string;
};

export default function AnimeCard({
  id,
  nome,
  episodio,
  tipo,
  imagem,
}: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`}>
      <div className="group w-full cursor-pointer rounded-2xl p-2 transition-all duration-200 hover:bg-zinc-800">
        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl">
          <Image
            src={imagem}
            alt={nome}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/50 group-hover:opacity-100">
            <Play className="h-12 w-12 fill-white text-white" />
          </div>
        </div>

        <div className="pt-3">
          <h3 className="truncate text-[18px] font-black">{nome}</h3>

          <p className="text-[16px] text-zinc-400">
            Episódio {episodio} &nbsp;•&nbsp; {tipo}
          </p>
        </div>
      </div>
    </Link>
  );
}
