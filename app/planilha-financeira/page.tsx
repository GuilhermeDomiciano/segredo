"use client";

import { useState, useEffect } from "react";

export default function PlanilhaFinanceira() {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [novoValor, setNovoValor] = useState("");

  useEffect(() => {
    fetch("/api/saldo")
      .then((res) => res.json())
      .then((data) => setSaldo(data.saldo || 0));
  }, []);

  const atualizarSaldo = async () => {
    await fetch("/api/saldo", {
      method: "POST",
      body: JSON.stringify({ valor: parseFloat(novoValor) }),
    });
    setSaldo((prev) => (prev !== null ? prev + parseFloat(novoValor) : 0));
    setNovoValor("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Planilha Financeira</h1>
      <p>Saldo Atual: R$ {saldo !== null ? saldo.toFixed(2) : "Carregando..."}</p>
      <input
        type="number"
        value={novoValor}
        onChange={(e) => setNovoValor(e.target.value)}
        className="px-2 py-1 border rounded"
        placeholder="Digite um valor"
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={atualizarSaldo}>
        Adicionar ao Saldo
      </button>
    </div>
  );
}
