'use client';

import { useState } from 'react';
import { AccessibleButton } from '@/components/global/AccessibleButton';

interface PendingRepo {
  id: string;
  owner: string;
  repo: string;
  created_at: string;
}

export function PendingRepoCard({ item, onAudit }: { item: PendingRepo, onAudit: (id: string, action: 'aprovado' | 'rejeitado') => void }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action: 'aprovado' | 'rejeitado') => {
    setIsProcessing(true);
    await onAudit(item.id, action);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-[#B2B5E0]/30 rounded-3xl p-6 shadow-sm gap-4">
      
      {/* Informações do Repositório */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-[10px] font-bold text-[#2C2D41] bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-full uppercase tracking-widest">
            Código
          </span>
          <span className="text-xs text-[#2C2D41]/50 font-bold">
            {new Date(item.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        
        <h4 className="text-lg font-bold text-[#2C2D41] flex items-center gap-2">
          {item.owner} / <span className="text-[#B2B5E0]">{item.repo}</span>
        </h4>
        
        <a 
          href={`https://github.com/${item.owner}/${item.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-[#C5ADC5] hover:text-[#2C2D41] transition-colors underline"
        >
          Ver no GitHub ↗
        </a>
      </div>

      {/* Ações de Auditoria */}
      <div className="flex shrink-0 gap-3 w-full sm:w-auto mt-4 sm:mt-0">
        <AccessibleButton 
          onClick={() => handleAction('rejeitado')}
          disabled={isProcessing}
          className="!bg-white !text-red-600 !border-red-200 hover:!bg-red-50 hover:!border-red-300 !px-4 !py-2 !text-sm flex-1 sm:flex-none"
        >
          Rejeitar
        </AccessibleButton>
        <AccessibleButton 
          onClick={() => handleAction('aprovado')}
          disabled={isProcessing}
          className="!bg-[#2C2D41] hover:!bg-[#C5ADC5] !border-none !px-4 !py-2 !text-sm flex-1 sm:flex-none"
        >
          Aprovar
        </AccessibleButton>
      </div>

    </div>
  );
}