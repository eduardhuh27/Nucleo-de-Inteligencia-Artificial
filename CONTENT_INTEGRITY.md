# Diretrizes de Integridade de Conteúdo e Compliance - NIA-UFRJ

Este documento estabelece as regras técnicas e processuais para a manutenção da integridade, legalidade e transparência do portal do Núcleo de Inteligência Artificial da UFRJ.

---

## 1. Tratamento de Imagens e Direitos Autorais (Mídia)

Como uma plataforma pública, a violação de direitos autorais (copyright) expõe a UFRJ a riscos legais significativos.

### Diretrizes Técnicas para o Frontend (`next/image`)
* **Hospedagem Exclusiva:** Todas as imagens de interface devem ser servidas via Supabase Storage. É estritamente proibido carregar imagens diretamente de URLs externas não homologadas.
* **Configuração do `next.config.ts`:** O array `remotePatterns` deve estar restrito **apenas** ao domínio do Supabase do projeto. Isso previne injeção de imagens maliciosas de terceiros.
  ```typescript
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'seu-projeto.supabase.co' },
    ],
  },