'use client';

import { useFormStatus } from 'react-dom';
import { useState, useRef } from 'react';
import { uploadAndCreateDocument } from '@/app/actions/uploadDocuments'; // Ajuste o caminho se necessário

// 1. Subcomponente do Botão: Obrigatório estar isolado para o useFormStatus funcionar
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-3 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold py-4 px-4 rounded-xl transition-all focus:ring-4 focus:ring-[#C5ADC5] disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-lg"
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Processando Upload...
        </>
      ) : (
        <>
          <span className="text-xl leading-none">↑</span> Publicar no Acervo
        </>
      )}
    </button>
  );
}

// 2. Componente Principal do Formulário
export function UploadForm() {
  // Estado para gerenciar o feedback visual da Server Action
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Interceptador da Action para tratar a resposta
  async function handleAction(formData: FormData) {
    setFeedback(null); // Limpa mensagens anteriores
    
    const result = await uploadAndCreateDocument(formData);

    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    } else if (result.success) {
      setFeedback({ type: 'success', message: result.message || 'Documento publicado com sucesso!' });
      formRef.current?.reset(); // Limpa o formulário após o sucesso
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-8 flex items-center gap-3">
        <span className="text-[#C5ADC5] text-3xl leading-none"></span> Informações do Documento
      </h2>

      <form ref={formRef} action={handleAction} className="space-y-6">
        
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Título do Documento *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            placeholder="Ex: Diretrizes Brasileiras de IA"
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
          />
        </div>

        {/* Autor */}
        <div>
          <label htmlFor="autor" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Autor ou Instituição *
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            required
            placeholder="Ex: Ministério da Ciência, Tecnologia e Inovação"
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
          />
        </div>

        {/* Tipo e Data (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="tipo_documento" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              Tipo *
            </label>
            <select
              id="tipo_documento"
              name="tipo_documento"
              required
              defaultValue=""
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none cursor-pointer transition-all text-[#2C2D41]"
            >
              <option value="" disabled>Selecione uma categoria...</option>
              <option value="relatorio">Relatório</option>
              <option value="tese">Tese Acadêmica</option>
              <option value="guia_regulatorio">Guia Regulatório</option>
              <option value="artigo_cientifico">Artigo Científico</option>
              <option value="documento_referencia">Documento de Referência</option>
            </select>
          </div>

          <div>
            <label htmlFor="data_publicacao" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              Data de Publicação
            </label>
            <input
              type="date"
              id="data_publicacao"
              name="data_publicacao"
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41]"
            />
          </div>
        </div>

        {/* Upload do Arquivo */}
        <div className="pt-2">
          <label htmlFor="arquivo" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Arquivo (Somente PDF, Máx 10MB) *
          </label>
          <input
            type="file"
            id="arquivo"
            name="arquivo"
            accept="application/pdf"
            required
            className="w-full text-sm text-[#2C2D41]/70
              file:mr-4 file:py-3 file:px-6
              file:rounded-xl file:border-0
              file:text-sm file:font-bold
              file:bg-[#2C2D41] file:text-white
              hover:file:bg-[#B2B5E0] hover:file:text-[#2C2D41] cursor-pointer transition-all"
          />
        </div>

        {/* Feedback de Sucesso ou Erro */}
        {feedback && (
          <div className={`p-4 rounded-xl text-sm font-bold border ${feedback.type === 'success' ? 'bg-green-50/50 text-green-800 border-green-200' : 'bg-red-50/50 text-red-800 border-red-200'}`}>
            {feedback.type === 'success' ? '✓ ' : '✕ '}
            {feedback.message}
          </div>
        )}

        {/* Linha separadora */}
        <hr className="border-[#B2B5E0]/20 my-8" />

        {/* Botão de Envio (Renderizado via Subcomponente) */}
        <SubmitButton />
      </form>
    </div>
  );
}