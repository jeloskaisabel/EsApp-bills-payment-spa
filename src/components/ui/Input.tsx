import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const baseFieldStyles =
      "w-full rounded-2xl border border-slate-300/70 bg-white/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed";

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400/30"
              : ""
          } ${baseFieldStyles} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
