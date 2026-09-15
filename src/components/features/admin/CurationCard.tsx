'use client';

import { useState } from 'react';
import { aprovarDocumento, rejeitarDocumento } from '@/app/actions/curadoriaActions';

// Interface compatível com a tabela submissoes e com acervo
export interface PendingDocument {
  id: string;
  titulo: string;
  autor: string;
  tipo_documento?: string;
  tipo_submissao?: string;
  url_arquivo?: string;
  link?: string;
  email_contato?: string;
  data_publicacao?: string | null;
  destaques?: string | null;
  observacoes?: string | null;
  achados?: string | null;
  conclusoes?: string | null;
  created_at: string;
}

export function CurationCard({ doc }: { doc: PendingDocument }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    const res = await aprovarDocumento(doc.id);
    if (!res.success) {
      alert(`Erro ao aprovar: ${res.error}`);
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Tem certeza que deseja rejeitar e apagar esta submissão?')) return;
    
    setIsProcessing(true);
    const res = await rejeitarDocumento(doc.id);
    if (!res.success) {
      alert(`Erro ao rejeitar: ${res.error}`);
      setIsProcessing(false);
    }
  };

  const tipoExibicao = doc.tipo_documento || doc.tipo_submissao || 'documento';
  const urlLink = doc.url_arquivo || doc.link || '#';

  const formatTipo = (tipo: string) => {
    const tipos: Record<string, string> = {
      projeto: 'Iniciativa / Projeto',
      artigo: 'Artigo Acadêmico',
      repositorio: 'Repositório / Código',
      outro: 'Outro Documento',
      artigo_cientifico: 'Artigo Científico',
      guia_regulatorio: 'Guia Regulatório',
      tese: 'Tese Acadêmica',
      relatorio: 'Relatório',
      documento_referencia: 'Documento de Referência',
    };
    return tipos[tipo] || tipo;
  };

  return (
    <div className="bg-white rounded-3xl border border-[#B2B5E0]/30 shadow-sm p-6 flex flex-col gap-4">
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start border-b border-[#B2B5E0]/20 pb-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 rounded-full mb-2 uppercase tracking-wider">
            {formatTipo(tipoExibicao)}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#2C2D41]">{doc.titulo}</h3>
          <p className="text-sm text-[#2C2D41]/70 font-medium mt-1">👤 Autor/Instituição: {doc.autor}</p>
          {doc.email_contato && (
            <p className="text-xs text-[#2C2D41]/60 font-mono mt-1">✉️ {doc.email_contato}</p>
          )}
        </div>
        {urlLink !== '#' && (
          <a 
            href={urlLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#2C2D41] hover:text-[#C5ADC5] underline decoration-[#B2B5E0] transition-colors shrink-0 ml-4"
          >
            Visualizar Link ↗
          </a>
        )}
      </div>

      {/* Resumos Estruturados (Apenas renderiza se existirem) */}
      {(doc.destaques || doc.observacoes || doc.achados || doc.conclusoes) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {doc.destaques && (
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#B2B5E0]/20">
              <strong className="block text-[#2C2D41] mb-1 font-serif">Destaques:</strong>
              <p className="text-[#2C2D41]/80 whitespace-pre-wrap font-light">{doc.destaques}</p>
            </div>
          )}
          {doc.observacoes && (
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#B2B5E0]/20">
              <strong className="block text-[#2C2D41] mb-1 font-serif">Observações:</strong>
              <p className="text-[#2C2D41]/80 whitespace-pre-wrap font-light">{doc.observacoes}</p>
            </div>
          )}
          {doc.achados && (
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#B2B5E0]/20">
              <strong className="block text-[#2C2D41] mb-1 font-serif">Achados:</strong>
              <p className="text-[#2C2D41]/80 whitespace-pre-wrap font-light">{doc.achados}</p>
            </div>
          )}
          {doc.conclusoes && (
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#B2B5E0]/20">
              <strong className="block text-[#2C2D41] mb-1 font-serif">Conclusões:</strong>
              <p className="text-[#2C2D41]/80 whitespace-pre-wrap font-light">{doc.conclusoes}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-[#2C2D41]/50 mt-2 font-medium">
        Enviado em: {new Date(doc.created_at).toLocaleDateString('pt-BR')} às {new Date(doc.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[#B2B5E0]/20 mt-2">
        <button
          onClick={handleReject}
          disabled={isProcessing}
          className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
        >
          Rejeitar
        </button>
        <button
          onClick={handleApprove}
          disabled={isProcessing}
          className="px-6 py-2.5 text-sm font-bold text-white bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          {isProcessing ? 'Processando...' : '✅ Aprovar e Publicar'}
        </button>
      </div>
    </div>
  );
}