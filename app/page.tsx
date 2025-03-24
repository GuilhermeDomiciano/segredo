"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Bem-vindo!</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/primeiro-mes")}
      >
        Especial 1º Mês de Namoro
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => router.push("/planilha-financeira")}
      >
        Planilha Financeira
      </button>
    </div>
  );
}
