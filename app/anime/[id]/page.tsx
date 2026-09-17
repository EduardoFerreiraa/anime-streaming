import Header from "@/app/components/layout/header";
import { Plus, Play } from "lucide-react";

export default function AnimePage() {
  const generos = "bg-zinc-900 px-4 py-2 rounded-3xl";

  return (
    <div>
      <Header />
      <section className="mx-10 my-25">
        <div className="flex justify-between p-5">
          <div className="flex">
            <div className="bg-zinc-900 w-55 h-80 p-5 rounded-4xl">
              <h1>Imagem</h1>
            </div>
            <div className="ml-5">
              <ul className="flex gap-4">
                <li className={generos}>Ação</li>
                <li className={generos}>Drama</li>
                <li className={generos}>Mistério</li>
                <li className={generos}>Fantasia</li>
              </ul>
              <div className="my-3 w-180">
                <h1 className="text-4xl font-black">Attack on Titan</h1>
                <p>2013 - 4 temporadas - 87 episodios</p>
                <p className="my-4 text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                  atque vero similique amet veniam hic cum in omnis minima ipsa
                  animi et possimus quos, delectus vitae nam magni nihil.
                  Consectetur.
                </p>
                <div className="flex gap-4">
                  <button className="cursor-pointer flex items-center gap-3 bg-orange-500 text-black font-black px-8 py-5 rounded-4xl transition duration-300 hover:bg-orange-400">
                    <Play size={20} />
                    Assistir agora
                  </button>
                  <button className="cursor-pointer flex items-center gap-3 bg-zinc-900 font-black px-5 py-5 rounded-4xl transition duration-300 hover:bg-zinc-800">
                    <Plus size={20} />
                    Adicionar na lista
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 border border-zinc-900 bg-zinc-950 px-10 py-5 rounded-2xl">
            <h2 className="font-black">Informações</h2>
            <div className="flex justify-between py-5 text-zinc-600">
              <div className="flex flex-col gap-3">
                <p>Estúdio</p>
                <p>Diretor</p>
                <p>Status</p>
                <p>Tipo</p>
                <p>Áudio</p>
              </div>
              <div className="flex flex-col gap-3 text-zinc-600">
                <p>Wt Studio / MAPPA</p>
                <p>Tetsurô Araki</p>
                <p>Em andamento</p>
                <p>Série</p>
                <p>Legendado / Dublado</p>
              </div>
            </div>
            <div>
              <h2 className="font-black">Avaliação</h2>
              <p>
                9.1 <span className="text-zinc-600">(320K)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-around items-center border border-zinc-900 p-5">
        <div className="flex flex-col w-250">
          <h1 className="text-[21px]">Episódios</h1>
          <ul className="flex text-orange-500 gap-7 my-2">
            <li>Temporada 1</li>
            <li>Temporada 2</li>
            <li>Temporada 3</li>
            <li>Temporada 4</li>
          </ul>
          <div>
            <div className="flex border border-zinc-800 rounded-2xl p-1">
              <div className="w-55 h-25 bg-zinc-900 rounded-2xl mr-5"></div>
              <p>1</p>
              <div className="flex flex-col items-start ml-5">
                <h3 className="text-[18px]">O Titã Colossal</h3>
                <p className="text-zinc-600">24min</p>
                <div className="flex items-center gap-3 my-1">
                  <p className="bg-zinc-900 py-2 px-3 rounded-2xl">Legendado</p>
                  <p className="bg-zinc-900 py-2 px-3 rounded-2xl">Dublado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-125 h-70 border border-zinc-900 rounded-2xl"></div>
        </div>
      </section>
    </div>
  );
}
