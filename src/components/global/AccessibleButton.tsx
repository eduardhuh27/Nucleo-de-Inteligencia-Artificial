import { ButtonHTMLAttributes } from 'react';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccessibleButton({ children, className = '', ...props }: AccessibleButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-3 px-6 py-3.5 
        text-base font-bold text-white bg-[#2C2D41] 
        border-2 border-[#2C2D41] rounded-xl 
        transition-all duration-300 shadow-sm hover:shadow-md
        hover:bg-[#B2B5E0] hover:border-[#B2B5E0] hover:text-[#2C2D41]
        active:scale-[0.98]
        /* ACESSIBILIDADE DE TECLADO: Offset cria um respiro entre o botão e o anel de foco, crucial para daltônicos ou baixa visão */
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C5ADC5] focus-visible:ring-offset-2 focus-visible:ring-offset-white
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}