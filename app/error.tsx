'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="page-content"><h1 className="font-display text-xl">Não foi possível abrir esta tela</h1><p>Ocorreu uma falha inesperada. Tente novamente.</p><button className="btn-primary" onClick={reset}>Tentar novamente</button></main>;
}
