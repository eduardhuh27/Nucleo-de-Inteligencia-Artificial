import React from 'react';
import Link from 'next/link';

export interface DocumentItem {
  id: string;
  titulo: string;
  autor: string;
  tipo_documento: string;
  url_arquivo: string;
  data_publicacao: string | null;
}

export function DocumentCard({ item }: { item: DocumentItem }) {
  // Formatação amigável do Enum do banco de dados
  const formatType = (tipo: string) => {
    const tipos: Record<string, string> = {
      relatorio: 'Relatório',
      tese: 'Tese Acadêmica',
      guia_regulatorio: 'Guia Regulatório',
      artigo_cientifico: 'Artigo Científico',
      documento_referencia: 'Documento de Referência',
    };
    return tipos[tipo] || tipo;
  };

  // Formatação da data para o padrão PT-BR
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Data não informada';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  };

  return (
    <div className="flex flex-col bg-white border border-[#B2B5E0]/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <div className="mb-4">
        {/* Badge / Etiqueta */}
        <span className="inline-block px-4 py-1 text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 rounded-full mb-4 uppercase tracking-wider">
          {formatType(item.tipo_documento)}
        </span>
        
        {/* Título Serifado com Link para a Análise Completa */}
        <h3 className="text-2xl font-serif font-bold text-[#2C2D41] leading-tight mb-3 line-clamp-2">
          <Link 
            href={`/acervo/${item.id}`}
            className="hover:text-[#C5ADC5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5ADC5] rounded"
          >
            {item.titulo}
          </Link>
        </h3>
        
        {/* Autor com ícone sutil */}
        <p className="text-sm font-medium text-[#2C2D41]/80 flex items-center gap-2">
          <span className="text-[#C5ADC5] text-lg leading-none">✦</span> {item.autor}
        </p>
      </div>
      
      {/* Rodapé do Card */}
      <div className="mt-auto pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#B2B5E0]/20 gap-3">
        <span className="text-xs text-[#2C2D41]/60 font-semibold uppercase tracking-wide">
          {formatDate(item.data_publicacao)}
        </span>
        
        <div className="flex items-center gap-2">
          <Link
            href={`/acervo/${item.id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-[#2C2D41] border-2 border-[#2C2D41] hover:bg-[#2C2D41] hover:text-white rounded-xl transition-colors shadow-sm"
          >
            Ver Análise
          </Link>
          <a 
            href={item.url_arquivo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] rounded-xl transition-colors shadow-sm"
            title="Acessar arquivo oficial"
          >
            PDF ↗
          </a>
        </div>
      </div>
    </div>
  );
}