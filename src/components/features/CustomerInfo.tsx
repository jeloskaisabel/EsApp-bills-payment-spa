import type { CustomerSummary } from "@/types/api.types";
import { Card, CardContent } from "@/components/ui/Card";

interface CustomerInfoProps {
  data: CustomerSummary;
}

export function CustomerInfo({ data }: CustomerInfoProps) {
  const { customer, summary } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-4">
          {/* Info del cliente */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              {customer.fullName}
            </h2>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <p className="text-xs text-gray-500 mt-1">ID: {customer.id}</p>
          </div>

          {/* Resumen financiero */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t 
  border-gray-200"
          >
            <div className="bg-yellow-50 rounded p-3">
              <p className="text-xs text-gray-700 font-medium mb-1">
                Pendiente de Pago
              </p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-800">
                {formatCurrency(summary.totalPendingAmount)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {summary.pending} factura{summary.pending !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="bg-green-50 rounded p-3">
              <p className="text-xs text-gray-700 font-medium mb-1">Pagado</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800">
                {formatCurrency(summary.totalPaidAmount)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {summary.paid} factura{summary.paid !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Alerta de vencimiento */}
          {summary.overdue > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm font-medium text-red-800">
                ⚠️ {summary.overdue} factura{summary.overdue !== 1 ? "s" : ""}
                vencida{summary.overdue !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
