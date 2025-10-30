import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pay" | "search" | "cancel" | "secondary";
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    pay: "bg-[rgb(var(--color-success))] hover:bg-[rgb(5,100,70)] text-white shadow-sm",
    search:
      "bg-[rgb(var(--color-primary))] hover:bg-[rgb(12,60,120)] text-white shadow-sm",
    cancel: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };

  return (
    <button
      className={`
      px-6 py-2.5 rounded font-medium text-sm
      transition-all duration-150
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      ${variants[variant]}
      ${className}
    `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
