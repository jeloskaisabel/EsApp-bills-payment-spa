import type { CustomerSummary } from "../../types/api.types";
import { ArrowLeft } from "lucide-react";

interface CustomerInfoProps {
  data: CustomerSummary;
  onReset: () => void;
}

/**
 * Panel lateral con información del cliente y resumen de facturas
 */
export function CustomerInfo({ data, onReset }: CustomerInfoProps) {
  const { customer, summary } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-4 sm:space-y-5 w-full min-w-0">
      <div className="rounded-[28px] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Información cliente
          </h3>
          <button
            onClick={onReset}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-lg shadow-blue-500/30">
            {customer.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {customer.fullName}
            </h4>
            <p className="mt-0.5 text-xs font-normal text-gray-400 truncate">
              {customer.email}
            </p>
            <p className="mt-1 text-xs font-normal text-gray-400">
              ID: {customer.id}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg shadow-blue-500/30">
        <p className="text-xs font-medium text-blue-100">Saldo pendiente</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {formatCurrency(summary.totalPendingAmount)}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="text-xs font-normal text-blue-100">
            {summary.pending} factura{summary.pending !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-400/30">
          <div
            className="h-full rounded-full bg-white/80"
            style={{
              width: `${Math.min(
                (summary.totalPendingAmount / 5000) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-400">Total pagado</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {formatCurrency(summary.totalPaidAmount)}
              </p>
              <p className="mt-1 text-xs font-normal text-gray-400">
                {summary.paid} factura{summary.paid !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {summary.overdue > 0 && (
          <div className="rounded-[28px] bg-gradient-to-br from-red-50 to-red-100/50 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-xl shadow-sm">
                ⚠��
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900">
                  {summary.overdue} factura{summary.overdue !== 1 ? "s" : ""}{" "}
                  vencida{summary.overdue !== 1 ? "s" : ""}
                </p>
                <p className="mt-1 text-xs font-normal text-red-700">
                  Pague lo antes posible para evitar recargos adicionales
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-[28px] bg-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-700">Resumen</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-normal text-gray-500">Total facturas</span>
              <span className="font-medium text-gray-900">
                {summary.totalBills}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-normal text-gray-500">Pendientes</span>
              <span className="font-medium text-orange-600">
                {summary.pending}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-normal text-gray-500">Vencidas</span>
              <span className="font-medium text-red-600">
                {summary.overdue}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-normal text-gray-500">Pagadas</span>
              <span className="font-medium text-green-600">{summary.paid}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
