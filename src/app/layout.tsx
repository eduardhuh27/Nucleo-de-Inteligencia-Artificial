import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google'; // Fontes otimizadas
import Script from 'next/script';
import "./globals.css";

// Path imports implicando que os componentes globais foram criados
import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';
import { CookieConsent } from '@/components/features/compliance/CookieConsent';

// Configuração da fonte sans-serif principal do corpo
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Configuração da fonte serifada institucional para títulos específicos
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://nia.org.br'),
  title: {
    template: '%s | NIA',
    default: 'NIA | Núcleo de Inteligência Artificial',
  },
  description: 'Referência aberta, acadêmica e institucional sobre Inteligência Artificial no Brasil.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'NIA',
    description: 'Mapeamento ético e transparente do ecossistema de Inteligência Artificial no Brasil.',
    url: 'https://nia.org.br',
    siteName: 'NIA',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const EducationalOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NIA",
    "url": "https://nia.org.br",
    "logo": "https://nia.org.br/favicon.ico",
  };

  return (
    // Injeção de variáveis de fonte no HTML
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} antialiased`}>
      {/* 
        Aplicação de classes globais no body: 
        - Fundo padrão off-white established
        - Texto primário established
        - Estrutura flex para sticky footer
      */}
      <body className="font-sans flex flex-col min-h-screen bg-[#F8F9FA] text-[#2C2D41]">
        
        {/* SEO Técnico: Schema Org */}
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(EducationalOrganizationSchema)}
        </Script>
        
        {/*
          Componentes Globais envolvendo children:
          Garante consistência e evita duplicação de estruturas de navegação nas páginas internas.
        */}
        <Navbar />
        
        {/* Conteúdo dinâmico da página */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        {/* Componente crítico de conformidade e segurança (LGPD) */}
        <CookieConsent />
        
      </body>
    </html>
  );
}