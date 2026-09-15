'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect, Suspense } from 'react';

// 1. Isolamos a lógica do filtro em um sub-componente
function FilterContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // PREVENÇÃO DO LOOP INFINITO: 
    // Compara se o que está digitado é igual ao que já está na URL.
    // Se for, aborta a execução e não fica recarregando a página.
    const currentQ = searchParams.get('q') || '';
    if (searchTerm === currentQ) return;

    const delayDebounceFn = setTimeout(() => {
      // No Next.js 15, usar .toString() é a forma segura de clonar os parâmetros
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm) {
        params.set('q', searchTerm);
      } else {
        params.delete('q');
      }
      
      startTransition(() => {
        // scroll: false evita que a página pule para o topo a cada letra digitada
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const handleCategoryChange = (tipo: string) => {
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
          <label htmlFor="search" className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Buscar no Diretório
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nome ou descrição..."
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none transition-all text-[#2C2D41] placeholder:text-[#2C2D41]/40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2C2D41] uppercase tracking-wide mb-2">
            Filtrar por Categoria
          </label>
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            defaultValue={searchParams.get('tipo') || ''}
            className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#B2B5E0]/50 rounded-xl focus:ring-2 focus:ring-[#C5ADC5] focus:border-[#C5ADC5] outline-none cursor-pointer transition-all text-[#2C2D41]"
          >
            <option value="">Todas as entidades</option>
            <option value="empresa">Empresas</option>
            <option value="centro_pesquisa">Centros de Pesquisa</option>
            <option value="iniciativa_publica">Iniciativas Públicas</option>
            <option value="startup">Startups</option>
            <option value="ong">ONGs</option>
          </select>
        </div>

        {/* Feedback visual aprimorado (Spinner) */}
        {isPending && (
          <div className="flex items-center gap-2 text-sm text-[#2C2D41]/70 font-semibold animate-pulse pt-2">
            <div className="w-4 h-4 border-2 border-[#2C2D41]/70 border-t-transparent rounded-full animate-spin"></div>
            Buscando resultados...
          </div>
        )}
      </div>

      {/* Ações / Navegação */}
      <div className="flex w-full">
       <div className="mb-4">
            <a href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </a>
          </div>
      </div>

    </div>
  );
}

// 2. Componente principal exportado envelopado no Suspense (Obrigatório no App Router)
export function DirectoryFilter() {
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