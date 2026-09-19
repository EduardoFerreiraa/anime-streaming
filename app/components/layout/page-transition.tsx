"use client";

import { useEffect, useState } from "react";

export default function PageTransition() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        link.target === "_blank"
      ) {
        return;
      }

      // Página atual
      const paginaAtual = window.location.pathname;

      // Evita a animação se já estiver nessa página
      if (href === paginaAtual) {
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 600);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-9999 h-1 w-full">
      <div className="h-full w-1/3 animate-[pageLoading_600ms_ease-in-out_forwards] bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
    </div>
  );
}
