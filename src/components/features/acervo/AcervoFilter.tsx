'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect, Suspense } from 'react';

function FilterContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  // Debounce para atualizar a URL sem sobrecarregar o servidor
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (searchTerm === currentQ) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('q', searchTerm);
      } else {
        params.delete('q');
      }
      
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const handleTypeChange = (tipo: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tipo) {
      params.set('tipo', tipo);
    } else {
      params.delete('tipo');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-6 sticky top-6">
      
      {/* Box de Filtros Principal */}
      <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm space-y-6">
        <div>
          <label htmlFor="search-acervo" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Pesquisar no Acervo
          </label>
          <input
            id="search-acervo"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Título do documento ou autor..."
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Tipo de Documento
          </label>
          <select
            onChange={(e) => handleTypeChange(e.target.value)}
            defaultValue={searchParams.get('tipo') || ''}
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none cursor-pointer transition-all text-[#2C2D41]"
          >
            <option value="">Todos os documentos</option>
            <option value="relatorio">Relatórios</option>
            <option value="tese">Teses Acadêmicas</option>
            <option value="guia_regulatorio">Guias Regulatórios</option>
            <option value="artigo_cientifico">Artigos Científicos</option>
            <option value="documento_referencia">Documentos de Referência</option>
          </select>
        </div>

        {isPending && (
          <div className="flex items-center gap-2 text-sm text-[#2C2D41]/70 font-semibold animate-pulse pt-2">
            <div className="w-4 h-4 border-2 border-[#2C2D41]/70 border-t-transparent rounded-full animate-spin"></div>
            Buscando no acervo...
          </div>
        )}
      </div>

      {/* Ações / Navegação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="mb-4">
            <a href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </a>
          </div>

        <a 
          href="/acervo/novo"
          className="flex-1 text-center px-6 py-3.5 bg-[#2C2D41] border-2 border-[#2C2D41] text-white hover:bg-[#B2B5E0] hover:border-[#B2B5E0] hover:text-[#2C2D41] font-bold rounded-xl transition-colors shadow-sm text-base"
        >
          Novo 
        </a>
      </div>

    </div>
  );
}

export function AcervoFilter() {
  return (
    <Suspense fallback={
      <div className="p-8 bg-white rounded-3xl border border-[#B2B5E0]/30 shadow-sm animate-pulse h-72 flex items-center justify-center text-[#2C2D41]/50 text-sm font-semibold">
        Carregando filtros...
      </div>
    }>
      <FilterContent />
    </Suspense>
  );
}