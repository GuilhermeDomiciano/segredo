import { NextResponse } from "next/server";
import { redis } from "../../../lib/redis";

const SALDO_KEY = "saldo";

export async function GET() {
  const saldo = (await redis.get(SALDO_KEY)) || 0;
  return NextResponse.json({ saldo });
}

export async function POST(req: Request) {
  const { valor } = await req.json();
  const saldoAtual = (await redis.get(SALDO_KEY)) || 0;
  const novoSaldo = saldoAtual + valor;

  await redis.set(SALDO_KEY, novoSaldo);
  return NextResponse.json({ saldo: novoSaldo });
}
