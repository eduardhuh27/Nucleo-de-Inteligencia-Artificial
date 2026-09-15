import { forwardRef, InputHTMLAttributes, useId } from 'react';

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, id, ...props }, ref) => {
    // Gera um ID único e seguro para SSR caso nenhum seja fornecido
    const fallbackId = useId();
    const inputId = id ?? fallbackId;
    
    // O ID específico para a mensagem de erro vinculada
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col w-full">
        <label htmlFor={inputId} className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
          {label}
        </label>
        
        <input
          id={inputId}
          ref={ref}
          /* ARIA: Informa ao leitor de tela se o campo está em estado de erro */
          aria-invalid={!!error}
          /* ARIA: Lê a mensagem de erro imediatamente após o label do campo */
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#2C2D41] placeholder:text-[#2C2D41]/40
            outline-none transition-all shadow-sm
            /* ACESSIBILIDADE DE TECLADO: focus-visible evita anéis de foco ao clicar com o mouse, mas exibe claramente ao usar o Tab */
            focus-visible:outline-none focus-visible:ring-2
            ${error 
              ? 'border-red-500 focus-visible:ring-red-200 focus-visible:border-red-500' 
              : 'border-[#B2B5E0]/50 hover:border-[#C5ADC5] focus-visible:ring-[#C5ADC5] focus-visible:border-[#C5ADC5]'}
          `}
          {...props}
        />
        
        {/* ARIA: aria-live="polite" faz com que o leitor de tela anuncie o erro assim que ele aparecer na tela, sem interromper a fala atual */}
        {error && (
          <span id={errorId} aria-live="polite" className="text-xs font-bold text-red-500 mt-1.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';