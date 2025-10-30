export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="w-8 h-8 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}
