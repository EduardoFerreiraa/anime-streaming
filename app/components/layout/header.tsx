"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 100);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyle =
    "font-semibold hover:bg-zinc-900 p-2 pl-4 pr-4 rounded-2xl transition";

  return (
    <header
      className={`flex justify-between items-center p-5 fixed w-full z-10 bg-linear-to-b from-black/70 to-transparent
      ${
        scrolled
          ? "transition-all duration-400 bg-zinc-950/95 backdrop-blud-md"
          : "transition-all duration-400 br-linear-to-b from-black/70 to-transparent"
      }
    `}
    >
      <div className="ml-10 flex items-center gap-15">
        <h1 className="text-3xl text-orange-500">
          <Link href="/">
            Kuroi<span className="font-semibold text-white">.tv</span>
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-3 cursor-pointer">
            <li className={linkStyle}>
              <Link href="/">Início</Link>
            </li>
            <li className={linkStyle}>
              <Link href="/categorias">Categorias</Link>
            </li>
            <li className={linkStyle}>
              <Link href="/lancamentos">Lançamentos</Link>
            </li>
            <li className={linkStyle}>
              <Link href="/minhaLista">Minha lista</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <input
          type="search"
          name="buscar"
          id="buscarAnime"
          placeholder="Buscar anime..."
          className="border border-zinc-800 outline-none bg-zinc-900 rounded-2xl mr-5 px-7 py-2"
        />
        <button className="bg-zinc-900 rounded-2xl mr-10 p-2 pr-5 pl-5 cursor-pointer hover:bg-white hover:text-black transition">
          <Link href="/entrar">Entrar</Link>
        </button>
      </div>
    </header>
  );
}
