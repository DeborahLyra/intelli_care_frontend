import { Topbar } from "@/components/Topbar";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function CanaisPage() {
  return (
    <div className="p-8">
      <Topbar title="Canais" />

      <div className="mt-6 max-w-lg space-y-4">
        <div className="card p-5">
          <div className="flex items-center gap-2">
            <BsInstagram size={18} className="text-sage-800/70 dark:text-sage-50/70" />
            <h2 className="font-display text-base font-medium">Instagram</h2>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="badge bg-sage-50 text-sage-500 dark:bg-sage-600 dark:text-sage-50">
              Conectado
            </span>
            <span className="text-sage-800/70 dark:text-sage-50/70">@atendimento_consultorio</span>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2">
            <BsWhatsapp size={18} className="text-sage-800/70 dark:text-sage-50/70" />
            <h2 className="font-display text-base font-medium">WhatsApp</h2>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="badge bg-clay-400/15 text-clay-400">Aguardando conexão</span>
            <span className="text-sage-800/70 dark:text-sage-50/70">(consultorio)</span>
          </div>
          <button className="btn-ghost mt-3">Gerar novo QR Code</button>
        </div>
      </div>
    </div>
  );
}
