import { Bill } from "@/types/api.types";

interface BadgeProps {
  status: Bill["status"];
}

export function StatusBadge({ status }: BadgeProps) {
  const styles = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    paid: "bg-green-50 text-green-700 border-green-200",
    overdue: "bg-red-50 text-red-700 border-red-200",
  };

  const labels = {
    pending: "Pendiente",
    paid: "Pagado",
    overdue: "Vencido",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
