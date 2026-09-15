import React from 'react';

// Tipagem baseada no schema do banco
export interface DirectoryItem {
  id: string;
  nome: string;
  tipo_entidade: string;
  descricao: string;
  website: string | null;
  localizacao: string | null;
}

export function DirectoryCard({ item }: { item: DirectoryItem }) {
  // Mapeamento amigável do Enum para a UI
  const formatType = (tipo: string) => {
    const tipos: Record<string, string> = {
      empresa: 'Empresa',
      centro_pesquisa: 'Centro de Pesquisa',
      iniciativa_publica: 'Iniciativa Pública',
      ong: 'ONG',
      startup: 'Startup'
    };
    return tipos[tipo] || tipo;
  };

  return (
    <div className="flex flex-col bg-white border border-[#B2B5E0]/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      
      <div className="mb-4">
        {/* Badge / Etiqueta */}
        <span className="inline-block px-4 py-1 text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 rounded-full mb-4 uppercase tracking-wider">
          {formatType(item.tipo_entidade)}
        </span>
        
        {/* Título Serifado */}
        <h3 className="text-2xl font-serif font-bold text-[#2C2D41] leading-tight mb-3">
          {item.nome}
        </h3>
      </div>
      
      {/* Descrição */}
      <p className="text-[#2C2D41]/80 text-base mb-6 flex-grow line-clamp-3 leading-relaxed">
        {item.descricao}
      </p>
      
      {/* Rodapé (Localização e Ação) */}
      <div className="mt-auto pt-6 border-t border-[#B2B5E0]/20 flex flex-col gap-4">
        {item.localizacao && (
          <span className="text-sm font-medium text-[#2C2D41]/70 flex items-center gap-2">
            <span className="text-[#C5ADC5] text-lg leading-none">✦</span> {item.localizacao}
          </span>
        )}
        
        {item.website && (
          <a 
            href={item.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-[#2C2D41] border-2 border-[#2C2D41] hover:bg-[#2C2D41] hover:text-white rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#2C2D41]"
          >
            Visitar Website ↗
          </a>
        )}
      </div>
      
    </div>
  );
}