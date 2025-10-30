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

export interface PendingBillsResponse {
  customerId: string;
  totalPending: number;
  totalAmount: number;
  bills: Bill[];
}

export interface ApiError {
  error: string;
  message: string;
  timestamp?: string;
}
