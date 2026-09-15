'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function aprovarDocumento(id: string) {
  try {
    const supabase = await createClient();
    
    // Validação de autenticação de administrador
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Não autorizado. Apenas administradores autenticados podem aprovar submissões.');

    // Passo 1: Buscar o documento completo na tabela de submissões
    const { data: doc, error: fetchError } = await supabase
      .from('submissoes')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !doc) throw new Error('Documento não encontrado na fila de submissões.');

   // 1. Extraímos os campos extras e os que precisam ser renomeados/mapeados
    const { 
      id: oldId, 
      created_at, 
      email_contato,
      status,
      tipo_submissao,
      link, 
      url_arquivo,
      tipo_documento, 
      tipo, 
      ...dadosLimpos 
    } = doc;

    // 2. Montamos o payload traduzindo os nomes de 'submissoes' para 'acervo'
    const payload = {
      ...dadosLimpos,
      // Se não vier tipo_documento, tenta 'tipo', se não, usa fallback
      tipo_documento: tipo_documento || tipo || 'documento_referencia', 
      
      // Mapeia o 'link' para 'url_arquivo' (ou pega o próprio url_arquivo se existir)
      // O fallback '#' impede o crash caso os dois venham nulos em um card de teste antigo
      url_arquivo: url_arquivo || link || '#', 
      
      is_active: true
    };

    // 3. Inserir na tabela oficial (acervo)
    const { error: insertError } = await supabase
      .from('acervo')
      .insert(payload);

    if (insertError) throw new Error(`Erro ao mover para o acervo: ${insertError.message}`);

    // Passo 3: Deletar da tabela de submissões (já que foi aprovado)
    const { error: deleteError } = await supabase
      .from('submissoes')
      .delete()
      .eq('id', id);

    if (deleteError) throw new Error('Aprovado, mas erro ao limpar da fila.');

    revalidatePath('/admin/curadoria');
    revalidatePath('/acervo');

    return { success: true };
  } catch (err) {
    console.error("Erro ao aprovar documento:", err);
    const errorMessage = err instanceof Error ? err.message : 'Erro interno.';
    return { success: false, error: errorMessage };
  }
}

export async function rejeitarDocumento(id: string) {
  try {
    const supabase = await createClient();
    
    // Validação de autenticação de administrador
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Não autorizado. Apenas administradores autenticados podem rejeitar submissões.');

    // Deleta diretamente da tabela de submissões
    const { error } = await supabase
      .from('submissoes')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/curadoria');

    return { success: true };
  } catch (err) {
    console.error("Erro ao rejeitar documento:", err);
    const errorMessage = err instanceof Error ? err.message : 'Erro interno.';
    return { success: false, error: errorMessage };
  }
}