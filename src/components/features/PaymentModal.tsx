import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineQrCodeScanner, MdAccountBalance } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { Button } from '@/components/ui/Button';
import type { Bill } from '@/types/api.types';

interface PaymentModalProps {
  bill: Bill;
  onConfirm: (paymentMethod: string) => void;
  onCancel: () => void;
  isProcessing: boolean;
}

/**
 * Modal de confirmación de pago con selección de método
 */
export function PaymentModal({ bill, onConfirm, onCancel, isProcessing }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('qr_transfer');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const paymentMethods = [
    { key: 'qr_transfer', label: 'QR Bancario', Icon: MdOutlineQrCodeScanner },
    { key: 'bank_transfer', label: 'Transferencia', Icon: MdAccountBalance },
    { key: 'debit_card', label: 'Tarjeta de Débito', Icon: BsCreditCard },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Confirmar pago</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isProcessing}
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Total a pagar</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(bill.amount)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Servicio</span>
              <span className="font-medium text-gray-900">{bill.serviceName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Periodo</span>
              <span className="font-medium text-gray-900">{bill.billingMonth}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Referencia</span>
              <span className="text-xs font-mono text-gray-600">{bill.referenceCode}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Método de pago
            </label>
            <div className="space-y-2">
              {paymentMethods.map(({ key, label, Icon }) => (
                <label
                  key={key}
                  className={`
                    flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all
                    ${paymentMethod === key
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={key}
                    checked={paymentMethod === key}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                    disabled={isProcessing}
                  />
                  <Icon className={`text-xl ${paymentMethod === key ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="flex-1 text-sm font-medium text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="cancel"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="pay"
              onClick={() => onConfirm(paymentMethod)}
              isLoading={isProcessing}
              className="flex-1"
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
