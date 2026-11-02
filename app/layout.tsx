import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Lora({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600"] });

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
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
