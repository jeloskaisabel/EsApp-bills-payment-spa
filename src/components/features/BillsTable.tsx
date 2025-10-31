import { useState } from 'react';
import type { Bill } from '@/types/api.types';
import { Card, CardContent } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { SERVICE_TYPES } from '@/constants/app';

interface BillsTableProps {
  bills: Bill[];
  onPayBill: (bill: Bill) => void;
}

/**
 * Lista de facturas con filtros por estado
 */
export function BillsTable({ bills, onPayBill }: BillsTableProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-BO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'pending') return bill.status === 'pending';
    if (filter === 'paid') return bill.status === 'paid';
    if (filter === 'overdue') return bill.status === 'overdue';
    return true;
  });

  const pendingCount = bills.filter(b => b.status === 'pending').length;
  const paidCount = bills.filter(b => b.status === 'paid').length;
  const overdueCount = bills.filter(b => b.status === 'overdue').length;

  const filterOptions = [
    { value: 'all', label: 'Todas', count: bills.length },
    { value: 'pending', label: 'Pendientes', count: pendingCount },
    { value: 'paid', label: 'Pagadas', count: paidCount },
    { value: 'overdue', label: 'Vencidas', count: overdueCount },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 w-full min-w-0">
      <FilterTabs options={filterOptions} value={filter} onChange={(v) => setFilter(v as typeof filter)} />

      {filteredBills.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 sm:py-12">
            <p className="text-gray-500">
              {bills.length === 0
                ? 'No se encontraron facturas'
                : `No hay facturas ${
                    filter === 'pending' ? 'pendientes' :
                    filter === 'paid' ? 'pagadas' :
                    filter === 'overdue' ? 'vencidas' : ''
                  }`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3 w-full">
          {filteredBills.map((bill) => (
            <Card key={bill.id} hover>
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate flex-1 min-w-0">
                      {SERVICE_TYPES[bill.serviceType as keyof typeof SERVICE_TYPES] || bill.serviceName}
                    </h3>
                    <StatusBadge status={bill.status} />
                  </div>

                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p className="truncate">{bill.provider}</p>
                    <p className="text-xs sm:text-sm">Periodo: {bill.billingMonth}</p>
                    <p className="text-xs sm:text-sm">Vencimiento: {formatDate(bill.dueDate)}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 mb-1">Monto</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 break-words">
                        {formatCurrency(bill.amount)}
                      </p>
                      {bill.lateFee && (
                        <p className="text-xs text-red-600 mt-0.5">
                          + {formatCurrency(bill.lateFee)} mora
                        </p>
                      )}
                    </div>

                    {bill.status === 'pending' || bill.status === 'overdue' ? (
                      <Button variant="pay" onClick={() => onPayBill(bill)} className="w-full sm:w-auto">
                        Pagar
                      </Button>
                    ) : bill.status === 'paid' && bill.paidAt ? (
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-xs text-green-700 font-medium">Pagado</p>
                        <p className="text-xs text-gray-500">{formatDate(bill.paidAt)}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
