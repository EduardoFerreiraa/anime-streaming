import { Play, Plus } from "lucide-react";

export default function BtnAssistir() {
  return (
    <button className="flex items-center gap-2 text-[20px] mt-5 bg-orange-500 py-3 px-6 rounded-2xl hover:bg-orange-600 transition cursor-pointer">
      <Play size={20} />
      Assistir agora
    </button>
  );
}

export function AdicionarLista() {
  return (
    <button className="flex items-center gap-2 text-[20px] mt-5 bg-zinc-900 border border-zinc-700 rounded-2xl py-3 px-4 hover:bg-zinc-950 transition cursor-pointer">
      <Plus size={20} />
      Adicionar na lista
    </button>
  );
}
