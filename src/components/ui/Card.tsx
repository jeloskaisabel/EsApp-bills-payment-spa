import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85
        backdrop-blur-lg shadow-[0_28px_60px_rgba(15,23,42,0.12)]
        transition-transform duration-200 ease-out
        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-[0_40px_80px_rgba(15,23,42,0.18)]"
            : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-6 sm:p-8 ${className}`}>{children}</div>;
}
