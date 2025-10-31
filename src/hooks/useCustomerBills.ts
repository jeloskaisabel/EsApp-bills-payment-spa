import { apiClient } from "@/api/client";
import { CustomerSummary } from "@/types/api.types";
import { useState } from "react";

/**
 * Hook para gestionar el estado y operaciones de facturas de cliente
 */
export function useCustomerBills() {
  const [data, setData] = useState<CustomerSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomerData = async (customerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const summary = await apiClient.getCustomerSummary(customerId);
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const payBill = async (billId: string, paymentMethod: string) => {
    if (!data) return;

    const originalBill = data.bills.find((bill) => bill.id === billId);
    if (!originalBill) return;

    const updatedBill = await apiClient.payBill(billId, { paymentMethod });

    const wasOverdue = originalBill.status === 'overdue';
    const wasPending = originalBill.status === 'pending';

    setData({
      ...data,
      bills: data.bills.map((bill) =>
        bill.id === billId ? updatedBill : bill
      ),
      summary: {
        ...data.summary,
        pending: wasPending ? data.summary.pending - 1 : data.summary.pending,
        paid: data.summary.paid + 1,
        overdue: wasOverdue ? data.summary.overdue - 1 : data.summary.overdue,
        totalPendingAmount:
          data.summary.totalPendingAmount - updatedBill.amount,
        totalPaidAmount: data.summary.totalPaidAmount + updatedBill.amount,
      },
    });

    return updatedBill;
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    fetchCustomerData,
    payBill,
    reset,
  };
}
