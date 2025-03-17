import "./globals.css";

export const metadata = {
  title: "Meu App Mobile",
  description: "Aplicação otimizada para dispositivos móveis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
