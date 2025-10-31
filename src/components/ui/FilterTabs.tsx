interface FilterTabsProps {
  options: { value: string; label: string; count?: number }[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Pestañas de filtro
 */
export function FilterTabs({ options, value, onChange }: FilterTabsProps) {
  return (
    <>
      <div className="sm:hidden">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {option.count !== undefined && ` (${option.count})`}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block border-b border-gray-200">
        <div className="flex gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap
                ${
                  value === option.value
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {option.label}
              {option.count !== undefined && (
                <span
                  className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs
                  ${
                    value === option.value
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
                >
                  {option.count}
                </span>
              )}
              {value === option.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
