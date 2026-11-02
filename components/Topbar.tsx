import { ThemeToggle } from "./ThemeToggle";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex items-center justify-between border-b border-black/[0.06] px-8 py-4 dark:border-white/[0.06]">
      <div>
        <h1 className="font-display text-lg font-medium">{title}</h1>
        {subtitle && (
          <p className="text-sm text-emerald-800/60 dark:text-emerald-50/60">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <select className="input w-auto py-1.5 text-sm">
          <option>Clínica Sorriso Pleno</option>
        </select>
        <button className="text-sm text-emerald-800/60 hover:text-emerald-800 dark:text-emerald-50/60 dark:hover:text-emerald-50">
          Sair
        </button>
        <ThemeToggle />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
          PH
        </div>
      </div>
    </header>
  );
}
