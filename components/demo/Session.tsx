'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export function DemoSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem('demo-session')) { queueMicrotask(() => setReady(true)); } else router.replace('/login'); }
    catch { router.replace('/login'); }
  }, [router]);
  return ready ? children : <p className="p-8" role="status">Abrindo demonstração…</p>;
}
