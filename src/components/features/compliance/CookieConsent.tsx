'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export function CookieConsent() {
  const [consentState, setConsentState] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  useEffect(() => {
    // Verifica o estado atual ao carregar a página no cliente
    const savedConsent = localStorage.getItem('nia_cookie_consent');
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsentState(savedConsent);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nia_cookie_consent', 'accepted');
    setConsentState('accepted');
    // Dispara evento para outros componentes (GTM, etc)
    window.dispatchEvent(new Event('consent_granted'));
  };

  const handleReject = () => {
    localStorage.setItem('nia_cookie_consent', 'rejected');
    setConsentState('rejected');
  };

  return (
    <>
      {/* 1. Injeção Condicional de Scripts de Rastreamento (Mantido) */}
      {consentState === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-SEU_CODIGO_AQUI`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SEU_CODIGO_AQUI', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* 2. Interface do Banner de Consentimento (Refatorado para o Novo Design) */}
      {consentState === 'pending' && (
        // Wrapper fixo na parte inferior com padding para flutuar
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 animate-in slide-in-from-bottom-full duration-500 pointer-events-none">
          
          {/* Cartão centralizado com novo design acadêmico */}
          <div className="max-w-7xl mx-auto bg-white border border-[#B2B5E0]/30 text-[#2C2D41] p-8 rounded-[2rem] shadow-[-4px_0_15px_rgba(44,45,65,0.08)] pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex-1">
              {/* Título com Fonte Serifada e Ícone Roxo Pastel */}
              <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-2 flex items-center gap-2">
                <span className="text-[#C5ADC5] text-2xl leading-none">🍪</span> Privacidade e Cookies
              </h3>
              
              <p className="text-sm text-[#2C2D41]/80 leading-relaxed font-light">
                O NIA utiliza cookies essenciais para o funcionamento do portal e cookies analíticos 
                para compreender como você interage com nosso conteúdo. Você pode gerenciar suas preferências. 
                Leia nossa <a href="/privacidade" className="text-[#2C2D41] font-bold underline hover:text-[#C5ADC5] transition-colors">Política de Privacidade</a>.
              </p>
            </div>

            {/* Ações Padronizadas com a Paleta */}
            <div className="flex shrink-0 flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-3 text-sm font-bold text-[#2C2D41] bg-white border-2 border-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] rounded-xl transition-all shadow-sm"
              >
                Recusar Analíticos
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 text-sm font-bold text-white bg-[#2C2D41] hover:bg-[#C5ADC5] hover:text-[#2C2D41] rounded-xl transition-all shadow-sm"
              >
                Aceitar Todos
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}