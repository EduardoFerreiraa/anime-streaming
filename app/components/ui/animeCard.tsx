import Image from "next/image";
import { Play } from "lucide-react";

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
  return (
    <div className="group cursor-pointer p-2 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-800">
      <div className="relative w-65 h-80 overflow-hidden rounded-2xl">
        <Image
          src={imagem}
          alt={nome}
          width={300}
          height={450}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-200 opacity-0 group-hover:opacity-100">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
      </div>

      <div className="w-full p-2 pt-3">
        <h3 className="text-[18px] font-black">{nome}</h3>
        <p className="text-[16px] text-zinc-400">
          Episódio {episodio} &nbsp;•&nbsp; {temporada}
        </p>
      </div>
    </div>
  );
}
