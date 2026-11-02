import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clínica — painel de atendimento",
  description: "Painel de atendimento com IA para clínicas de saúde",
};

// script inline evita o "flash" de tema errado antes do React montar
const noFlashScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
