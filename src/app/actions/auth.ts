'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Retorna o erro para ser exibido no frontend
    return { success: false, message: 'Credenciais inválidas. Tente novamente.' };
  }

  // Se der certo, redireciona para a área administrativa
  redirect('/admin/curadoria');
}