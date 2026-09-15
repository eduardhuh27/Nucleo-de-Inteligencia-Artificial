import { forwardRef, TextareaHTMLAttributes, useId } from 'react';

interface AccessibleTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const fallbackId = useId();
    const textareaId = id ?? fallbackId;
    const errorId = `${textareaId}-error`;

    return (
      <div className="flex flex-col w-full">
        <label htmlFor={textareaId} className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
          {label}
        </label>
        
        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#2C2D41] placeholder:text-[#2C2D41]/40
            outline-none transition-all shadow-sm resize-y min-h-[120px]
            /* ACESSIBILIDADE DE TECLADO: Mesma lógica aplicada no AccessibleInput */
            focus-visible:outline-none focus-visible:ring-2
            ${error 
              ? 'border-red-500 focus-visible:ring-red-200 focus-visible:border-red-500' 
              : 'border-[#B2B5E0]/50 hover:border-[#C5ADC5] focus-visible:ring-[#C5ADC5] focus-visible:border-[#C5ADC5]'}
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <span id={errorId} aria-live="polite" className="text-xs font-bold text-red-500 mt-1.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AccessibleTextarea.displayName = 'AccessibleTextarea';    