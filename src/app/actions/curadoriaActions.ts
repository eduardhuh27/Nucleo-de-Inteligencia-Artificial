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

    // 1. Extraímos os campos da tabela submissoes
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
      data_publicacao,
      ...dadosRestantes 
    } = doc;

    // Resolve o tipo do documento compatível com o Acervo
    let resolvedTipoDoc = tipo_documento || tipo;
    if (!resolvedTipoDoc && tipo_submissao) {
      const map: Record<string, string> = {
        artigo: 'artigo_cientifico',
        projeto: 'documento_referencia',
        repositorio: 'documento_referencia',
        outro: 'documento_referencia',
      };
      resolvedTipoDoc = map[tipo_submissao] || 'documento_referencia';
    }

    // 2. Montamos o payload para inserção no acervo oficial
    const payload = {
      titulo: doc.titulo,
      autor: doc.autor,
      tipo_documento: resolvedTipoDoc || 'documento_referencia',
      url_arquivo: url_arquivo || link || '#',
      data_publicacao: data_publicacao || new Date().toISOString().split('T')[0],
      destaques: doc.destaques || null,
      observacoes: doc.observacoes || null,
      achados: doc.achados || null,
      conclusoes: doc.conclusoes || null,
      is_active: true
    };

    // 3. Inserir na tabela oficial (acervo)
    const { error: insertError } = await supabase
      .from('acervo')
      .insert(payload);

    if (insertError) throw new Error(`Erro ao mover para o acervo: ${insertError.message}`);

    // Se a submissão for um repositório do GitHub, também insere na tabela repositorios se aplicável
    if (tipo_submissao === 'repositorio' && link) {
      const githubMatch = link.match(/github\.com\/([\w.-]+)\/([\w.-]+)/);
      if (githubMatch) {
        const owner = githubMatch[1];
        const repo = githubMatch[2];
        await supabase.from('repositorios').insert({
          owner,
          repo,
          status: 'aprovado'
        });
      }
    }

    // Passo 4: Deletar da tabela de submissões (já que foi aprovado)
    const { error: deleteError } = await supabase
      .from('submissoes')
      .delete()
      .eq('id', id);

    if (deleteError) throw new Error('Aprovado, mas erro ao limpar da fila.');

    revalidatePath('/admin/curadoria');
    revalidatePath('/acervo');
    revalidatePath('/indicadores');
    revalidatePath('/');

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

export async function auditarRepositorio(id: string, action: 'aprovado' | 'rejeitado') {
  try {
    const supabase = await createClient();
    
    // Validação de autenticação de administrador
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Não autorizado. Apenas administradores autenticados podem auditar repositórios.');

    if (action === 'aprovado') {
      const { error } = await supabase
        .from('repositorios')
        .update({ status: 'aprovado' })
        .eq('id', id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('repositorios')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }

    revalidatePath('/admin/curadoria');
    revalidatePath('/codigo');
    revalidatePath('/');
    revalidatePath('/indicadores');

    return { success: true };
  } catch (err) {
    console.error("Erro ao auditar repositório:", err);
    const errorMessage = err instanceof Error ? err.message : 'Erro interno.';
    return { success: false, error: errorMessage };
  }
}