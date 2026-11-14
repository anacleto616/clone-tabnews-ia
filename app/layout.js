import "./globals.css";

export const metadata = {
  title: "Em construção | Clone TabNews",
  description: "Estamos reconstruindo o TabNews durante o curso.dev.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
