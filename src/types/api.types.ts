/** Información completa del cliente */
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  address: string;
  city: string;
  department: string;
  phone: string;
  registeredAt: string;
}

/** Factura de servicio público */
export interface Bill {
  id: string;
  customerId: string;
  serviceType: string;
  serviceName: string;
  provider: string;
  period: string;
  billingMonth: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "overdue";
  consumption: string;
  accountNumber: string;
  referenceCode: string;
  barCode: string;
  paidAt?: string;
  paymentMethod?: string;
  transactionId?: string;
  lateFee?: number;
  daysOverdue?: number;
}

/** Registro de transacción de pago */
export interface Payment {
  id: string;
  billId: string;
  customerId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  bankName?: string;
  transactionId: string;
  authorizationCode?: string;
  paidAt: string;
  status: string;
  receiptNumber: string;
}

/** Resumen de cliente con sus facturas y estadísticas */
export interface CustomerSummary {
  customer: Pick<Customer, "id" | "fullName" | "email">;
  summary: {
    totalBills: number;
    pending: number;
    paid: number;
    overdue: number;
    totalPendingAmount: number;
    totalPaidAmount: number;
  };
  bills: Bill[];
}

/** Respuesta de facturas pendientes del cliente */
export interface PendingBillsResponse {
  customerId: string;
  totalPending: number;
  totalAmount: number;
  bills: Bill[];
}

/** Error de respuesta de la API */
export interface ApiError {
  error: string;
  message: string;
  timestamp?: string;
}
