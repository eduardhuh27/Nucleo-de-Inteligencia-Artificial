'use client';

import { useState, useTransition, useRef } from 'react';
import { submitCollaboration } from '@/app/actions/submitCollaborations';

export default function ColaborarPage() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitCollaboration(formData);
      
      if (result.error) {
        setFeedback({ type: 'error', message: result.error });
      } else if (result.success) {
        setFeedback({ type: 'success', message: result.message! });
        formRef.current?.reset();
      }
    });
  };

  return (
    <main className="flex flex-col items-center gap-8 min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] tracking-tight mb-4">
            Colabore com o Ecossistema
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#2C2D41]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Submeta projetos, artigos acadêmicos ou repositórios abertos. 
            Todas as submissões passam por uma curadoria da equipe NIA antes da publicação.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30 mb-10">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="tipo_submissao" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
                O que você deseja compartilhar? *
              </label>
              <select
                id="tipo_submissao"
                name="tipo_submissao"
                required
                className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none cursor-pointer transition-all text-[#2C2D41]"
              >
                <option value="projeto">Iniciativa / Projeto Prático</option>
                <option value="artigo">Artigo Científico / Acadêmico</option>
                <option value="repositorio">Repositório de Código / Modelo</option>
                <option value="outro">Outros Documentos</option>
              </select>
            </div>

            <div>
              <label htmlFor="titulo" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
                Título da Submissão *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                placeholder="Ex: Novo framework para LLMs em Português"
                className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
              />
            </div>

            <div>
              <label htmlFor="link" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
                Link Público (URL) *
              </label>
              <input
                type="url"
                id="link"
                name="link"
                required
                placeholder="https://..."
                className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="autor" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
                  Autor ou Instituição *
                </label>
                <input
                  type="text"
                  id="autor"
                  name="autor"
                  required
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41]"
                />
              </div>

              <div>
                <label htmlFor="email_contato" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
                  E-mail para Contato *
                </label>
                <input
                  type="email"
                  id="email_contato"
                  name="email_contato"
                  required
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41]"
                />
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl text-sm font-bold border ${feedback.type === 'success' ? 'bg-green-50/50 text-green-800 border-green-200' : 'bg-red-50/50 text-red-800 border-red-200'}`}>
                {feedback.type === 'success' ? '✓ ' : '✕ '}
                {feedback.message}
              </div>
            )}

            <hr className="border-[#B2B5E0]/20 my-8" />

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-3 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold py-4 px-4 rounded-xl transition-all focus:ring-4 focus:ring-[#C5ADC5] disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-lg"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Enviando para Curadoria...
                </>
              ) : (
                <>
                  <span className="text-xl leading-none"></span> Enviar Submissão
                </>
              )}
            </button>

          </form>
        </div>

        <div className="flex justify-center">
          <a 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#2C2D41] text-[#2C2D41] hover:bg-[#2C2D41] hover:text-white font-bold rounded-xl transition-all shadow-sm text-lg"
          >
            <span>&larr;</span> Voltar para a Home
          </a>
        </div>
      </div>
    </main>
  );
}