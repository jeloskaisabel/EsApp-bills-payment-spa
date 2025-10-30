import type {
  Bill,
  Customer,
  CustomerSummary,
  PendingBillsResponse,
} from "@/types/api.types";

const API_BASE_URL = "/api";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: "Request failed",
        message: response.statusText,
      }));
      throw new Error(error.message || "Request failed");
    }
    return response.json();
  }

  async getCustomer(customerId: string): Promise<Customer> {
    return this.request<Customer>(`/customers/${customerId}`);
  }

  async getCustomerSummary(customerId: string): Promise<CustomerSummary> {
    return this.request<CustomerSummary>(`/customers/${customerId}/summary`);
  }

  async getCustomerBills(customerId: string): Promise<Bill[]> {
    return this.request<Bill[]>(`/bills?customerId=${customerId}`);
  }

  async getPendingBills(customerId: string): Promise<PendingBillsResponse> {
    return this.request<PendingBillsResponse>(
      `/customers/${customerId}/bills/pending`
    );
  }

  async payBill(
    billId: string,
    paymentData: {
      paymentMethod?: string;
      transactionId?: string;
    }
  ): Promise<Bill> {
    return this.request<Bill>(`/bills/${billId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "paid",
        ...paymentData,
      }),
    });
  }

  async healthCheck(): Promise<{
    status: string;
    service: string;
    timestamp: string;
  }> {
    return this.request("/health");
  }
}

export const apiClient = new ApiClient();
