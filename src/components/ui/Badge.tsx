import type { Bill } from "@/types/api.types";
import {
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

interface BadgeProps {
  status: Bill["status"];
}

/**
 * Badge visual que muestra el estado de una factura
 */
export function StatusBadge({ status }: BadgeProps) {
  const styles = {
    pending:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80 shadow-[0_6px_16px_rgba(245,158,11,0.28)]",
    paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80 shadow-[0_6px_16px_rgba(16,185,129,0.28)]",
    overdue:
      "bg-rose-50 text-rose-700 ring-1 ring-rose-200/80 shadow-[0_6px_16px_rgba(244,63,94,0.28)]",
  } as const;

  const labels = {
    pending: "Pendiente",
    paid: "Pagado",
    overdue: "Vencido",
  } as const;

  const icons = {
    pending: FiClock,
    paid: FiCheckCircle,
    overdue: FiAlertTriangle,
  } as const;

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      <Icon className="text-sm" />
      {labels[status]}
    </span>
  );
}
