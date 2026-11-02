import { Sidebar } from '@/components/Sidebar';
import { DemoProvider } from '@/components/demo/Provider';
import { DemoSession } from '@/components/demo/Session';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <DemoSession><DemoProvider><div className="lg:flex"><Sidebar /><main id="main-content" className="min-h-screen min-w-0 flex-1"><div className="demo-banner">Modo demonstração · dados fictícios salvos neste navegador</div>{children}</main></div></DemoProvider></DemoSession>;
}
