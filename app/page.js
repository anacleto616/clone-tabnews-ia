import { Suspense } from "react";
import LaunchConfetti from "./launch-confetti";

export const dynamic = "force-dynamic";

async function getContentCount() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?strategy=new&per_page=1&page=1",
      { cache: "no-store", signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return null;
    const header = response.headers.get("x-pagination-total-rows");
    const count = header === null ? NaN : Number(header);
    return Number.isSafeInteger(count) && count >= 0 ? count : null;
  } catch {
    return null;
  }
}

async function ContentCount() {
  const contentCount = await getContentCount();
  return contentCount === null ? (
    <p>Não foi possível consultar o total de conteúdos agora.</p>
  ) : (
    <p>
      <strong>{contentCount.toLocaleString("pt-BR")}</strong>
      <span>conteúdos publicados no TabNews</span>
    </p>
  );
}

export default function Home() {
  return (
    <main>
      <LaunchConfetti />
      <span className="eyebrow">TabNews · curso.dev</span>
      <h1>Em construção</h1>
      <p className="description">
        Estamos neste exato momento reconstruindo o TabNews, um lugar na internet
        para quem trabalha com tecnologia e precisa conteúdos com valor concreto
      </p>
      <div className="content-count">
        <Suspense fallback={<p role="status">Consultando total de conteúdos…</p>}>
          <ContentCount />
        </Suspense>
      </div>
      <a href="https://www.tabnews.com.br">Visite o TabNews oficial ↗</a>
    </main>
  );
}
