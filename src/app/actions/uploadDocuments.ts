'use server';

import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

export async function uploadAndCreateDocument(formData: FormData) {
  const supabase = await createClient();

  // Validação de autenticação obrigatória
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Não autorizado. Apenas administradores autenticados podem publicar documentos diretamente.' };
  }

  // 1. Extração dos dados do formulário
  const file = formData.get('arquivo') as File;
  const titulo = formData.get('titulo') as string;
  const autor = formData.get('autor') as string;
  const tipo_documento = formData.get('tipo_documento') as string;
  const data_publicacao = formData.get('data_publicacao') as string;

  // 2. Validação de Segurança (MIME Type e Tamanho)
  if (!file || file.type !== 'application/pdf') {
    return { error: 'Formato inválido. Apenas arquivos PDF são permitidos.' };
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    return { error: 'O arquivo excede o limite máximo de 10MB.' };
  }

  // 3. Sanitização do Nome do Arquivo (Prevenção de Colisão e Traversal)
  const fileExtension = file.name.split('.').pop();
  const safeFileName = `${randomUUID()}.${fileExtension}`;
  
  // Organiza em pastas lógicas dentro do bucket por tipo de documento
  const filePath = `${tipo_documento}s/${safeFileName}`;

  try {
    // 4. Upload físico para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documentos_acervo')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false // Não substitui arquivos existentes
      });

    if (uploadError) throw new Error(`Falha no upload: ${uploadError.message}`);

    // 5. Recuperação da URL Pública Segura
    const { data: { publicUrl } } = supabase
      .storage
      .from('documentos_acervo')
      .getPublicUrl(filePath);

    // 6. Inserção na Tabela Relacional
    const { error: dbError } = await supabase.from('acervo').insert({
      titulo,
      autor,
      tipo_documento,
      url_arquivo: publicUrl,
      data_publicacao
    });

    // 7. Estratégia de Rollback (Prevenção de Arquivos Órfãos)
    if (dbError) {
      await supabase.storage.from('documentos_acervo').remove([filePath]);
      throw new Error(`Falha ao salvar metadados. O arquivo foi removido. Erro: ${dbError.message}`);
    }

    return { success: true, message: 'Documento publicado com sucesso!' };

  }catch (error) { // O TypeScript assume 'unknown' aqui por padrão
    console.error("Erro na transação de upload:", error);
    
    // Verificamos se o erro é realmente uma instância nativa de Error
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Ocorreu um erro inesperado durante a publicação.';

    return { error: errorMessage };
  }
}