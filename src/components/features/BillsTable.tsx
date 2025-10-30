import type { Bill } from "@/types/api.types";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SERVICE_TYPES } from "@/constants/app";

interface BillsTableProps {
  bills: Bill[];
  onPayBill: (bill: Bill) => void;
}

export function BillsTable({ bills, onPayBill }: BillsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (bills.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No se encontraron facturas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {bills.map((bill) => (
        <Card key={bill.id} hover>
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Servicio y Estado */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  {SERVICE_TYPES[
                    bill.serviceType as keyof typeof SERVICE_TYPES
                  ] || bill.serviceName}
                </h3>
                <StatusBadge status={bill.status} />
              </div>

              {/* Info del servicio */}
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="truncate">{bill.provider}</p>
                <p>Periodo: {bill.billingMonth}</p>
                <p>Vencimiento: {formatDate(bill.dueDate)}</p>
              </div>

              {/* Monto y Acción */}
              <div
                className="flex items-end justify-between pt-3 border-t 
  border-gray-100"
              >
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monto a pagar</p>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {formatCurrency(bill.amount)}
                  </p>
                  {bill.lateFee && (
                    <p className="text-xs text-red-600 mt-0.5">
                      + {formatCurrency(bill.lateFee)} mora
                    </p>
                  )}
                </div>

                {bill.status === "pending" && (
                  <Button
                    variant="pay"
                    onClick={() => onPayBill(bill)}
                    className="text-sm px-4 py-2"
                  >
                    Pagar
                  </Button>
                )}

                {bill.status === "paid" && bill.paidAt && (
                  <div className="text-right">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Pagado
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(bill.paidAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
