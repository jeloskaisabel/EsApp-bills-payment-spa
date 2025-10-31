import { useState } from "react";
import { ReceiptText, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CustomerSearchProps {
  onSearch: (customerId: string) => void;
  isLoading?: boolean;
}

/**
 * Formulario de búsqueda de cliente por ID
 */
export function CustomerSearch({ onSearch, isLoading }: CustomerSearchProps) {
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId.trim()) {
      setError("Por favor ingrese un ID de cliente");
      return;
    }

    setError("");
    onSearch(customerId.trim());
  };

  return (
    <div className="rounded-[32px] bg-white p-6 sm:p-10 border border-gray-200">
      <div className="mb-8">
        <div className="text-center text-blue-600">
          <ReceiptText className="w-16 h-16 mx-auto" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Buscar cliente</h2>
        <p className="mt-2 text-sm font-normal text-gray-400">
          Ingresa el ID del cliente para consultar sus facturas pendientes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="customerId"
            className="block text-sm font-medium text-gray-700"
          >
            ID de Cliente
          </label>
          <div className="relative mt-2">
            <input
              id="customerId"
              type="text"
              placeholder="Ej: CLI-2024-001"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={isLoading}
              className={`w-full rounded-2xl border-0 bg-gray-50 px-5 py-4 text-base font-normal text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset disabled:bg-gray-100 disabled:text-gray-500 ${
                error
                  ? "ring-red-300 focus:ring-red-500"
                  : "ring-gray-200 focus:ring-blue-500"
              }`}
              autoFocus
            />
          </div>
          {error && (
            <p className="mt-2 text-sm font-normal text-red-600">{error}</p>
          )}
          {!error && (
            <p className="mt-2 text-xs font-normal text-gray-400">
              Ejemplos válidos: CLI-2024-001, CLI-2024-002
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="search"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              Buscar facturas
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
