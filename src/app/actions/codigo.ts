'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitRepositoryAction(owner: string, repo: string) {
  const supabase = await createClient();

  // Insere o repositório forçando o status como 'pendente'
  const { error } = await supabase
    .from('repositorios')
    .insert([
      { 
        owner, 
        repo, 
        status: 'pendente' 
      }
    ]);

  if (error) {
    console.error("Erro ao submeter repositório:", error);
    return { success: false, message: "Ocorreu um erro ao enviar sua sugestão. Tente novamente." };
  }

  // Avisa ao Next.js para limpar o cache da página de curadoria para o admin ver na hora
  revalidatePath('/admin/curadoria');
  
  return { success: true };
}