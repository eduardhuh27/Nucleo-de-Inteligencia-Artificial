'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const documentSchema = z.object({
  titulo: z.string().min(5, 'O título deve ter no mínimo 5 caracteres.'),
  autor: z.string().min(3, 'O nome do autor/instituição é obrigatório.'),
  tipo_documento: z.string().min(1, 'Selecione o tipo de documento.'),
  url_arquivo: z.string().url('Insira uma URL válida.'),
  consentimento_lgpd: z.literal(true, {
    message: "Você deve aceitar os termos para submeter o documento."
  }),
});

type DocumentFormData = z.infer<typeof documentSchema>;

export function SubmitDocumentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema)
  });

  const onSubmit = async (data: DocumentFormData) => {
    // Lógica de envio (Server Action)
    console.log(data);
  };

  return (
    // Wrapper para garantir que o formulário nunca cause overflow
    <div className="w-full max-w-full overflow-x-hidden bg-white p-8 md:p-10 rounded-[3rem] border border-[#B2B5E0]/30 shadow-sm">
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full min-w-0">
            <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              Título
            </label>
            <input
              {...register('titulo')}
              placeholder="Ex: Diretrizes de IA"
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40 text-sm"
            />
            {errors.titulo && <p className="text-red-500 font-bold text-xs mt-1.5">{errors.titulo.message}</p>}
          </div>

          <div className="w-full min-w-0">
            <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
              Autor / Instituição
            </label>
            <input
              {...register('autor')}
              placeholder="Nome do responsável"
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40 text-sm"
            />
            {errors.autor && <p className="text-red-500 font-bold text-xs mt-1.5">{errors.autor.message}</p>}
          </div>
        </div>

        {/* Campo incluído para satisfazer a validação do Zod */}
        <div className="w-full min-w-0">
          <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Tipo de Documento
          </label>
          <select
            {...register('tipo_documento')}
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none cursor-pointer transition-all text-[#2C2D41] text-sm"
          >
            <option value="">Selecione uma categoria...</option>
            <option value="relatorio">Relatório</option>
            <option value="tese">Tese Acadêmica</option>
            <option value="guia_regulatorio">Guia Regulatório</option>
            <option value="artigo_cientifico">Artigo Científico</option>
            <option value="documento_referencia">Documento de Referência</option>
          </select>
          {errors.tipo_documento && <p className="text-red-500 font-bold text-xs mt-1.5">{errors.tipo_documento.message}</p>}
        </div>

        <div className="w-full min-w-0">
          <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            URL do Arquivo
          </label>
          <input
            {...register('url_arquivo')}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40 text-sm"
          />
          {errors.url_arquivo && <p className="text-red-500 font-bold text-xs mt-1.5">{errors.url_arquivo.message}</p>}
        </div>

        <div className="pt-6 border-t border-[#B2B5E0]/20">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('consentimento_lgpd')}
              className="mt-1 w-4 h-4 accent-[#2C2D41] rounded focus:ring-[#C5ADC5]"
            />
            <span className="text-sm text-[#2C2D41]/80 leading-tight font-medium">
              Concordo com a <a href="/privacidade" className="text-[#2C2D41] font-bold underline hover:text-[#B2B5E0] transition-colors">Política de Privacidade</a> e autorizo o processamento destes dados.
            </span>
          </label>
          {errors.consentimento_lgpd && <p className="text-red-500 font-bold text-xs mt-1.5 ml-7">{errors.consentimento_lgpd.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold py-3 px-8 rounded-xl transition-all focus:ring-4 focus:ring-[#C5ADC5] shadow-sm text-sm"
        >
          Submeter Documento
        </button>
      </form>
    </div>
  );
}