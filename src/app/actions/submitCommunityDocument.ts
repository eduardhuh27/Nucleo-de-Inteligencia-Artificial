'use server';

import { createClient } from '@/lib/supabase/server';

// Interface baseada no schema que criaremos no frontend
export interface CommunityDocumentPayload {
  titulo: string;
  autor: string;
  tipo_documento: string;
  url_arquivo: string;
  data_publicacao?: string;
  destaques?: string;
  observacoes?: string;
  achados?: string;
  conclusoes?: string;
}

export async function submitCommunityDocument(data: CommunityDocumentPayload) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('acervo').insert({
      ...data,
      is_active: false, // CRÍTICO: Define o status como "Pendente/Em Curadoria"
    });

    if (error) {
      console.error('Erro do Supabase ao inserir documento:', error.message);
      return { success: false, error: 'Não foi possível enviar o documento. Tente novamente mais tarde.' };
    }

    return { success: true, message: 'Documento enviado com sucesso! Ele será analisado pela nossa equipe de curadoria.' };
  } catch (err) {
    console.error('Erro inesperado na Server Action:', err);
    return { success: false, error: 'Ocorreu um erro interno no servidor.' };
  }
}