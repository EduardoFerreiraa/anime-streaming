import Image from "next/image";
import onePiece from "../../../public/img/fund-anime2.png";

export default function Bg_anime() {
  return (
    <div className="absolute inset-0">
      <Image
        className="w-full h-screen object-cover object-center fixed z-0"
        src={onePiece}
        alt="One Piece"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent z-1"></div>
    </div>
  );
}

