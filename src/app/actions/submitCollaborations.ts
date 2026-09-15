'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitCollaboration(formData: FormData) {
  // 1. Extração de Dados
  const tipo_submissao = formData.get('tipo_submissao') as string;
  const titulo = formData.get('titulo') as string;
  const link = formData.get('link') as string;
  const autor = formData.get('autor') as string;
  const email_contato = formData.get('email_contato') as string;

  // 2. Validação Estrita (Prevenção de SPAM e Injeções)
  if (!titulo || titulo.length < 5 || titulo.length > 150) {
    return { error: 'O título deve ter entre 5 e 150 caracteres.' };
  }
  
  if (!autor || autor.length < 2) {
    return { error: 'Nome de autor ou instituição inválido.' };
  }

  // Validação nativa de formato de E-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_contato)) {
    return { error: 'Forneça um endereço de e-mail válido.' };
  }

  // Validação rigorosa de URL (evita links maliciosos como javascript:alert(1))
  try {
    const parsedUrl = new URL(link);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error();
    }
  } catch {
    return { error: 'O link fornecido não é uma URL válida (use http:// ou https://).' };
  }

  // 3. Conexão Segura e Inserção
  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from('submissoes').insert({
      tipo_submissao,
      titulo,
      link,
      autor,
      email_contato,
      // Nota: o status 'pendente' é inserido automaticamente pelo banco
    });

    if (dbError) {
      console.error('Erro no Supabase:', dbError);
      return { error: 'Ocorreu um erro ao registrar sua colaboração. Tente novamente mais tarde.' };
    }

    return { success: true, message: 'Submissão enviada com sucesso! Nossa equipe fará a revisão em breve.' };
  } catch (error) {
    return { error: 'Falha interna do servidor.' };
  }
}