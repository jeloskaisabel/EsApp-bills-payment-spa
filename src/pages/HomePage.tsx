import { useState } from "react";
import { CustomerInfo } from "@/components/features/CustomerInfo";
import { BillsTable } from "@/components/features/BillsTable";
import { PaymentModal } from "@/components/features/PaymentModal";
import { PageHeader } from "@/components/features/PageHeader";
import { useCustomerBills } from "@/hooks/useCustomerBills";
import type { Bill } from "@/types/api.types";
import { CustomerSearch } from "@/components/features/CustomSearch";

/**
 * Página principal de gestión de facturas y pagos
 */
export function HomePage() {
  const { data, isLoading, error, fetchCustomerData, payBill, reset } =
    useCustomerBills();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handleSearch = (customerId: string) => {
    fetchCustomerData(customerId);
  };

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill);
  };

  const handleConfirmPayment = async (paymentMethod: string) => {
    if (!selectedBill) return;

    setIsPaymentProcessing(true);
    try {
      await payBill(selectedBill.id, paymentMethod);
      setSelectedBill(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al procesar el pago";
      alert(errorMessage);
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900">
      <div className="flex min-h-screen flex-col">
        <PageHeader data={data} onReset={reset} />

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-10 overflow-x-hidden">
          <div className={data ? "w-full max-w-[100vw]" : "mx-auto max-w-2xl"}>
            {!data ? (
              <CustomerSearch onSearch={handleSearch} isLoading={isLoading} />
            ) : (
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full">
                <div className="lg:col-span-1 min-w-0">
                  <CustomerInfo data={data} onReset={reset} />
                </div>

                <div className="space-y-4 lg:col-span-2 min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Facturas por servicio
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Gestiona pagos pendientes y revisa el estado de cada
                        operación.
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.28em] text-gray-500 whitespace-nowrap">
                      {data.bills.length} registros
                    </span>
                  </div>
                  <BillsTable bills={data.bills} onPayBill={handlePayBill} />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-3xl border border-red-300 bg-red-50 px-6 py-4 text-sm text-red-800">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedBill && (
        <PaymentModal
          bill={selectedBill}
          onConfirm={handleConfirmPayment}
          onCancel={() => setSelectedBill(null)}
          isProcessing={isPaymentProcessing}
        />
      )}
    </div>
  );
}
