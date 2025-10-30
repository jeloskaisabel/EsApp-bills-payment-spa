import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface CustomerSearchProps {
  onSearch: (customerId: string) => void;
  isLoading?: boolean;
}

export function CustomerSearch({ onSearch, isLoading }: CustomerSearchProps) {
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId.trim()) {
      setError("Ingrese un ID de cliente");
      return;
    }

    setError("");
    onSearch(customerId.trim());
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Consultar Facturas
            </h2>
            <p className="text-sm text-gray-600">
              Ingrese su ID de cliente para ver sus facturas pendientes
            </p>
          </div>

          <Input
            label="ID de Cliente"
            placeholder="CLI-2024-001"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            error={error}
            helperText="Ejemplo: CLI-2024-001"
            disabled={isLoading}
            autoFocus
          />

          <Button
            type="submit"
            variant="search"
            isLoading={isLoading}
            className="w-full"
          >
            Buscar Facturas
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
