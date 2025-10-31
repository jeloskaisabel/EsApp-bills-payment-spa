import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pay" | "search" | "cancel" | "secondary";
  isLoading?: boolean;
  children: ReactNode;
}

/**
 * Botón con variantes de estilo predefinidas
 */
export function Button({
  variant = "secondary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    pay: "bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg",
    search: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none px-6 py-4 rounded-2xl",
    cancel: "border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg",
  };

  return (
    <button
      className={`
        font-medium text-sm sm:text-base
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2.5
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
}
