import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

interface DocumentoAcervo {
  id: string;
  titulo: string;
  autor: string;
  tipo_documento: string;
  url_arquivo: string;
  data_publicacao: string | null;
  imagem_capa_url?: string | null;
  destaques?: string | null;
  observacoes?: string | null;
  achados?: string | null;
  conclusoes?: string | null;
  created_at?: string;
}

export const revalidate = 0;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: doc } = await supabase
    .from('acervo')
    .select('titulo, autor')
    .eq('id', id)
    .single();

  if (!doc) {
    return {
      title: 'Documento não encontrado | Acervo NIA-UFRJ',
    };
  }

  return {
    title: `${doc.titulo} | Acervo NIA-UFRJ`,
    description: `Análise estruturada e síntese técnica do documento "${doc.titulo}", de autoria de ${doc.autor}.`,
  };
}

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

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Data não informada';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

export default async function DetalhesDocumentoPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: doc, error } = await supabase
    .from('acervo')
    .select('*')
    .eq('id', id)
    .single<DocumentoAcervo>();

  if (error || !doc) {
    notFound();
  }

  const hasAnalysisBlocks = Boolean(
    doc.destaques || doc.observacoes || doc.achados || doc.conclusoes
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb dinâmico */}
        <Breadcrumb />

        {/* 1. Header do Documento (Metadados e Ações Principais) */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-[#B2B5E0]/30 p-8 md:p-12 mt-4">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block px-4 py-1 text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 rounded-full uppercase tracking-wider">
                  {formatType(doc.tipo_documento)}
                </span>
                <span className="text-xs text-[#2C2D41]/60 font-medium">
                  Publicado em: {formatDate(doc.data_publicacao)}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] leading-tight mb-4">
                {doc.titulo}
              </h1>

              <p className="text-lg md:text-xl text-[#2C2D41]/80 font-light flex items-center gap-2 mb-6">
                <span>Por:</span>
                <strong className="font-semibold text-[#2C2D41]">{doc.autor}</strong>
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#B2B5E0]/20">
                <a
                  href={doc.url_arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-[#C5ADC5] text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Acessar Documento Oficial (PDF) ↗
                </a>

                <Link
                  href="/acervo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-[#2C2D41] text-[#2C2D41] hover:bg-[#2C2D41] hover:text-white font-bold rounded-xl transition-all text-base"
                >
                  ← Voltar ao Acervo
                </Link>
              </div>
            </div>

            {/* Imagem de Capa Opcional */}
            {doc.imagem_capa_url && (
              <div className="w-full md:w-56 shrink-0">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#B2B5E0]/30 shadow-inner bg-[#F8F9FA]">
                  <Image
                    src={doc.imagem_capa_url}
                    alt={`Capa oficial de ${doc.titulo}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 224px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2. Síntese Técnica Estruturada (Padrão de Benchmarking OBIA / Cursos) */}
        <section className="mt-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#C5ADC5]/30 text-[#2C2D41] flex items-center justify-center text-sm font-bold">
                ✦
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41]">
                Síntese Técnica e Análise da Curadoria
              </h2>
            </div>
            <p className="text-[#2C2D41]/70 max-w-3xl text-base">
              Quadro analítico padronizado desenvolvido pela equipe do NIA-UFRJ com base nas diretrizes do Observatório de IA, sintetizando os pontos essenciais do documento para pesquisadores, gestores públicos e a sociedade.
            </p>
          </div>

          {hasAnalysisBlocks ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bloco 1: Destaques */}
              <div className="bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-xl shadow-xs">
                      📌
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#2C2D41]">
                      Destaques
                    </h3>
                  </div>
                  <div className="text-[#2C2D41]/90 leading-relaxed whitespace-pre-wrap font-light text-base">
                    {doc.destaques || (
                      <span className="text-gray-400 italic">Nenhum destaque específico registrado.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloco 2: Observações */}
              <div className="bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-xl shadow-xs">
                      🔍
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#2C2D41]">
                      Observações
                    </h3>
                  </div>
                  <div className="text-[#2C2D41]/90 leading-relaxed whitespace-pre-wrap font-light text-base">
                    {doc.observacoes || (
                      <span className="text-gray-400 italic">Nenhuma observação metodológica registrada.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloco 3: Achados */}
              <div className="bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-xl shadow-xs">
                      💡
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#2C2D41]">
                      Achados
                    </h3>
                  </div>
                  <div className="text-[#2C2D41]/90 leading-relaxed whitespace-pre-wrap font-light text-base">
                    {doc.achados || (
                      <span className="text-gray-400 italic">Nenhum achado empírico registrado.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloco 4: Conclusões */}
              <div className="bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-xl shadow-xs">
                      🎯
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#2C2D41]">
                      Conclusões
                    </h3>
                  </div>
                  <div className="text-[#2C2D41]/90 leading-relaxed whitespace-pre-wrap font-light text-base">
                    {doc.conclusoes || (
                      <span className="text-gray-400 italic">Nenhuma recomendação final registrada.</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Estado quando o documento ainda não teve seus blocos preenchidos na curadoria */
            <div className="bg-white border-2 border-dashed border-[#B2B5E0]/40 rounded-3xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📋
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-2">
                Síntese Técnica em Processamento
              </h3>
              <p className="text-[#2C2D41]/70 max-w-lg mx-auto text-base mb-6 font-light leading-relaxed">
                Este material já está indexado e disponível para download integral. A síntese padronizada em quatro blocos (Destaques, Observações, Achados e Conclusões) está sendo elaborada pela equipe de curadoria do NIA-UFRJ.
              </p>
              <a
                href={doc.url_arquivo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2C2D41] text-white font-bold rounded-xl hover:bg-[#B2B5E0] hover:text-[#2C2D41] transition-colors text-sm"
              >
                Ler Documento Original na Íntegra (PDF) ↗
              </a>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}