'use client';

import { useState } from 'react';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Intercepta o form para podermos mostrar o estado de "carregando"
  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    
    const result = await login(formData);
    
    if (result && !result.success) {
      setError(result.message);
      setIsPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
        
        {/* Cabeçalho do Login */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#2C2D41] tracking-tight">Acesso Restrito</h1>
          <p className="text-[#2C2D41]/70 mt-3 text-sm font-medium">Faça login para acessar a Curadoria</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          
          {/* E-mail */}
          <div>
            <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
              placeholder="admin@nia.ufrj.br"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
              placeholder="••••••••"
            />
          </div>

          {/* Tratamento de Erro Visual */}
          {error && (
            <div className="p-4 bg-red-50/50 text-red-800 border border-red-200 rounded-xl text-sm font-bold">
              ✕ {error}
            </div>
          )}

          <hr className="border-[#B2B5E0]/20 my-6" />

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold py-4 px-4 rounded-xl transition-all focus:ring-4 focus:ring-[#C5ADC5] disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-lg"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Autenticando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        <div className="mb-4">
            <a href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </a>
          </div>
      </div>
    </main>
  );
}