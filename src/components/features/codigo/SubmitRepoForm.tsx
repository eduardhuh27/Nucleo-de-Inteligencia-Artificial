'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccessibleInput } from '@/components/global/AccessibleInput';
import { AccessibleButton } from '@/components/global/AccessibleButton';
// Importe a Server Action que acabamos de criar
import { submitRepositoryAction } from '@/app/actions/codigo';

const githubUrlRegex = /^https?:\/\/(www\.)?github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

const repoSchema = z.object({
  github_url: z.string().regex(githubUrlRegex, 'Insira uma URL válida de um repositório no GitHub. Ex: https://github.com/facebook/react'),
});

type RepoFormData = z.infer<typeof repoSchema>;

export function SubmitRepoForm() {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RepoFormData>({
    resolver: zodResolver(repoSchema)
  });

  const onSubmit = async (data: RepoFormData) => {
    setFeedback(null);
    
    // Extrai o owner e o repo da URL
    const match = data.github_url.match(githubUrlRegex);
    if (!match) return;
    
    const owner = match[2];
    const repo = match[3];

    // Chama a função real do servidor
    const result = await submitRepositoryAction(owner, repo);

    if (result.success) {
      setFeedback({ type: 'success', message: 'Repositório enviado para curadoria com sucesso!' });
      reset(); // Limpa o formulário
    } else {
      setFeedback({ type: 'error', message: result.message || 'Erro ao processar requisição.' });
    }
  };

  return (
    <div className="w-full bg-white p-8 md:p-10 rounded-[3rem] border border-[#B2B5E0]/30 shadow-sm">
      <div className="mb-6 border-b border-[#B2B5E0]/20 pb-4">
        <h3 className="text-2xl font-serif font-bold text-[#2C2D41]">Sugerir Repositório</h3>
        <p className="text-[#2C2D41]/70 text-sm mt-1">
          Ajude a mapear o ecossistema nacional enviando ferramentas e frameworks de IA.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AccessibleInput
          label="URL do Repositório (GitHub)"
          placeholder="https://github.com/usuario/projeto"
          {...register('github_url')}
          error={errors.github_url?.message}
        />

        {/* Feedback Visual */}
        {feedback && (
          <div className={`p-4 rounded-xl text-sm font-bold ${
            feedback.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {feedback.type === 'success' ? '✓ ' : '✕ '}
            {feedback.message}
          </div>
        )}

        <AccessibleButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Enviando...' : 'Enviar para Curadoria'}
        </AccessibleButton>
      </form>
    </div>
  );
}