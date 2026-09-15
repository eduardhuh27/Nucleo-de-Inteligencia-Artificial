import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { UploadForm } from '@/components/features/acervo/UploadForm';

export const metadata = {
  title: 'Adicionar Documento | Acervo NIA-UFRJ',
  description: 'Página de administração para upload de documentos no acervo do NIA-UFRJ.',
};

export default async function NovoDocumentoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Defesa em profundidade: Bloqueia upload por usuários não autenticados
  if (!user) {
    redirect('/login?redirectTo=/acervo/novo');
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Administração */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2D41] tracking-tight mb-4">
            Administração do Acervo
          </h1>
          <p className="text-lg text-[#2C2D41]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Utilize este painel para fazer o upload seguro de novos relatórios, teses e guias regulatórios para a biblioteca digital do NIA-UFRJ.
          </p>
        </div>

        {/* Renderização do Componente Client-Side */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
            <UploadForm />
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex justify-center">
          <a 
            href="/acervo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#2C2D41] text-[#2C2D41] hover:bg-[#2C2D41] hover:text-white font-bold rounded-xl transition-all shadow-sm text-lg"
          >
            <span>&larr;</span> Consultar Acervo
          </a>
        </div>
        
      </div>
    </main>
  );
}