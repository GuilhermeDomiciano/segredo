import "./globals.css";

export const metadata = {
  title: "Nosso 1º Mês ❤️",
  description: "Um site especial para comemorar nosso primeiro mês de namoro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-b from-red-500 via-pink-400 to-blue-500 text-white">
        {children}
      </body>
    </html>
  );
}


