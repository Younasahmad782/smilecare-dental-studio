import { cn } from "@/lib/utils";

/** Accessible label + error wrapper. The child control must use id={id} and aria-describedby={`${id}-error`}. */
export function Field({ id, label, error, required, hint, className, children }: {
  id: string; label: string; error?: string; required?: boolean; hint?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label} {required ? <span className="text-red-700" aria-hidden>*</span> : <span className="font-normal text-ash-500">(optional)</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-ash-500">{hint}</p>}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className={cn("field-error", !error && "hidden")}>{error}</p>
    </div>
  );
}
