import { FiUser } from "react-icons/fi";
import { SummaryCards } from "./SummaryCards";
import type { CustomerSummary } from "@/types/api.types";

interface PageHeaderProps {
  data: CustomerSummary | null;
  onReset: () => void;
}

/**
 * Encabezado de página con título y tarjetas de resumen
 */
export function PageHeader({ data, onReset }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:gap-6 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-10 overflow-x-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-gray-500">
            Panel de pagos
          </p>
          <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            Gestiona tus servicios
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-gray-600">
            Consulta montos pendientes, paga facturas y revisa tu historial.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3 text-sm flex-shrink-0">
          <FiUser className="text-xl text-blue-500" />
          <div>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              Administrador financiero
            </p>
          </div>
        </div>
      </div>

      {data && <SummaryCards data={data} onReset={onReset} />}
    </header>
  );
}
