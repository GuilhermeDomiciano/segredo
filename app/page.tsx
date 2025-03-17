"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [tempoJuntos, setTempoJuntos] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [tocando, setTocando] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const calcularTempoJuntos = () => {
      const inicioNamoro = new Date(2025, 1, 18)
      const agora = new Date();
      const diff = agora.getTime() - inicioNamoro.getTime();

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);

      setTempoJuntos(`${dias} dias, ${horas}h ${minutos}m ${segundos}s`);
    };

    calcularTempoJuntos();
    const intervalo = setInterval(calcularTempoJuntos, 1000);

    return () => clearInterval(intervalo);
  }, []);


  useEffect(() => {
    const carregarFotos = async () => {
      try {
        const res = await fetch("/api/fotos");
        const data = await res.json();
        setFotos(data.imagens);
      } catch (error) {
        console.error("Erro ao carregar fotos", error);
      }
    };

    carregarFotos();
  }, []);

  const toggleMusica = () => {
    if (audioRef.current) {
      if (tocando) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setTocando(!tocando);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <audio ref={audioRef} loop>
        <source src="/meu-personagem-favorito.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusica}
        className="mt-4 px-4 py-2 bg-white text-red-500 font-bold rounded-full shadow-md transition-transform hover:scale-105"
      >
        {tocando ? "⏸️ Pausar Música" : "🎵 Tocar Música"}
      </button>

      <h1 className="text-4xl font-bold mt-4">&hearts; Feliz 1º Mês, Amorzinho! &hearts;</h1>

      <p className="text-lg mt-2">
        Estamos juntos há <span className="font-semibold">{tempoJuntos}</span>
      </p>


      <p className="mt-4 text-lg italic">"Você é o meu personagem favorito"</p>

      <div className="mt-6 p-4 bg-white text-black rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-bold mb-2">💌 Para Geis 💌</h2>
        <p className="text-sm">
          Meu amor, cada dia ao seu lado é uma nova história incrível.
          Tivemos nosso primeiro encontro, segundo encontro, terceiro encontro e todas as outras vezes que nos encontrávamos eu me sentia cada vez mais feliz.
          Feliz nosso primeiro mês, que seja o início de uma vida toda juntos!  
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">📸 Nossos Momentos 📸</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {fotos.length > 0 ? (
            fotos.map((foto, index) => (
              <Image
                key={index}
                src={`/fotos/${foto}`}
                width={150}
                height={150}
                alt={`Foto ${index + 1}`}
                className="rounded-lg shadow-lg"
              />

            ))
          ) : (
            <p className="text-sm italic">Nenhuma foto adicionada ainda...</p>
          )}
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </main>
  );
}
