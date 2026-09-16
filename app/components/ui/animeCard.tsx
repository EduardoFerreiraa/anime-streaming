import onePiece from "../../../public/img/fund-anime2.png";
import Image from "next/image";

export default function AnimeCard() {
  const cardAnime =
    "relative cursor-pointer p-3 rounded-2xl transition-all duration-200 hover:scale-102 hover:bg-zinc-800";

  return (
    <section className="absolute bg-zinc-950 w-full p-10">
      <h2 className="text-3xl mb-5 font-black">Em alta</h2>

      <div className="flex items-start gap-5">
        <div className={cardAnime}>
          <div className="w-75 h-95">
            <Image
              src={onePiece}
              alt="One Piece"
              className="w-full h-full object-cover rounded-2xlxl rounded-2xl"
            />
          </div>
          <div className="w-full rounded-2xl p-3 absolute bottom-0 left-0 bg-linear-to-t from-black/90 to-transparen">
            <h3>One Piece</h3>
            <p>Episódio 1123&nbsp; •&nbsp; T20</p>
          </div>
        </div>
      </div>
    </section>
  );
}
