import BtnAssistir from "./btn";
import { AdicionarLista } from "./btn";

export default function Hero() {
  return (
    <section className="relative z-1 px-10">
      <div className="flex flex-col items-start justify-center h-screen pt-40">
        <span className="text-[18px] font-bold border border-orange-500 py-2 px-4 rounded-3xl">
          Destaque
        </span>

        <h1 className="text-7xl font-black">One Piece</h1>
        <p className="mt-2 text-[18px] text-zinc-400">
          Aventura&nbsp; •&nbsp; Ação&nbsp; •&nbsp; Comédia&nbsp; •&nbsp; 1999
        </p>

        <p className="text-[18px] w-[50%] mt-5">
          Acompanhe Luffy e sua tripulação em uma incrível aventura pela Grand
          Line, enfrentando inimigos e descobrindo novas ilhas em busca do
          lendário tesouro One Piece.
        </p>
        <div className="flex gap-5">
          <BtnAssistir />
          <AdicionarLista />
        </div>
      </div>
    </section>
  );
}
