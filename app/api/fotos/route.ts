import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const fotosDir = path.join(process.cwd(), "public/fotos");

  try {
    const arquivos = fs.readdirSync(fotosDir);
    const imagens = arquivos.filter((arquivo) =>
      /\.(png|jpg|jpeg|gif)$/i.test(arquivo)
    );

    return NextResponse.json({ imagens });
  } catch {
    return NextResponse.json({ imagens: [] });  
  }
}
