import { HiOutlineRefresh } from "react-icons/hi";
import type { CustomerSummary } from "@/types/api.types";

interface SummaryCardsProps {
  data: CustomerSummary;
  onReset: () => void;
}

/**
 * Tarjetas de resumen con totales pendientes, pagados y vencidos
 */
export function SummaryCards({ data, onReset }: SummaryCardsProps) {
  const { summary } = data;

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 w-full">
      <div className="rounded-4xl bg-blue-500 px-6 py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white">
          Pendiente
        </p>
        <p className="mt-3 text-3xl font-semibold text-white">
          {new Intl.NumberFormat("es-BO", {
            style: "currency",
            currency: "BOB",
            minimumFractionDigits: 2,
          }).format(summary.totalPendingAmount)}
        </p>
        <p className="mt-2 text-xs text-white">
          {summary.pending} factura{summary.pending !== 1 ? "s" : ""} en espera
          de pago
        </p>
      </div>

      <div className="rounded-4xl bg-green-600 px-6 py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white">Pagado</p>
        <p className="mt-3 text-3xl font-semibold text-white">
          {new Intl.NumberFormat("es-BO", {
            style: "currency",
            currency: "BOB",
            minimumFractionDigits: 2,
          }).format(summary.totalPaidAmount)}
        </p>
        <p className="mt-2 text-xs text-white">
          {summary.paid} factura{summary.paid !== 1 ? "s" : ""} liquidadas
        </p>
      </div>

      <div className="rounded-4xl bg-rose-500 px-4 sm:px-6 py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white">
          Vencidas
        </p>
        <p className="mt-3 text-3xl font-semibold text-white">
          {summary.overdue}
        </p>
        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 text-xs text-white">
          <span className="whitespace-nowrap">Requiere seguimiento</span>
        </div>
      </div>

      <div className="flex justify-end items-center sm:col-span-3">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-black transition-colors hover:bg-gray-200 whitespace-nowrap text-xs"
        >
          <HiOutlineRefresh size={12} />
          <span className="hidden sm:inline">Buscar nuevo cliente</span>
          <span className="inline sm:hidden">Nueva búsqueda</span>
        </button>
      </div>
    </div>
  );
}
