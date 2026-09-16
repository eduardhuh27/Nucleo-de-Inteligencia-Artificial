'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVersionsDropdownOpen, setIsVersionsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVersionsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#B2B5E0]/30 sticky top-0 z-50 font-sans transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Institucional Clicável */}
          <Link 
            href="/" 
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5ADC5] rounded-xl p-1 transition-shadow"
            aria-label="Voltar para a página inicial do NIA"
          >
            <div 
              className="w-12 h-12 bg-[#B2B5E0] flex items-center justify-center text-[#2C2D41] font-serif font-bold text-2xl shadow-sm clip-hexagon"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              n
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#2C2D41] tracking-tight leading-none">
                NIA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B2B5E0] mt-0.5">
                Inteligência Artificial
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link href="/sobre" className="text-[#2C2D41]/80 hover:text-[#C5ADC5] font-bold transition-colors">
              Sobre
            </Link>
            <Link href="/indicadores" className="text-[#2C2D41]/80 hover:text-[#C5ADC5] font-bold transition-colors">
              Indicadores
            </Link>
            <Link href="/diretorio" className="text-[#2C2D41]/80 hover:text-[#C5ADC5] font-bold transition-colors">
              Diretório
            </Link>
            <Link href="/acervo" className="text-[#2C2D41]/80 hover:text-[#C5ADC5] font-bold transition-colors">
              Acervo
            </Link>
            <Link href="/codigo" className="text-[#2C2D41]/80 hover:text-[#C5ADC5] font-bold transition-colors">
              Código
            </Link>

            {/* Dropdown de Versões Alternativas Preservadas */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsVersionsDropdownOpen(!isVersionsDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2C2D41] bg-[#B2B5E0]/20 hover:bg-[#B2B5E0]/40 rounded-lg border border-[#B2B5E0]/40 transition-colors"
                aria-expanded={isVersionsDropdownOpen}
              >
                <span>Versões</span>
                <span className={`transition-transform duration-200 ${isVersionsDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {isVersionsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#B2B5E0]/30 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#B2B5E0]/20 text-[11px] font-bold uppercase tracking-wider text-[#2C2D41]/60">
                    Variações de Layout
                  </div>
                  <Link
                    href="/"
                    onClick={() => setIsVersionsDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#2C2D41] hover:bg-[#F8F9FA] hover:text-[#C5ADC5] transition-colors"
                  >
                    <span>Oficial (Padrão)</span>
                    <span className="text-[10px] bg-[#C5ADC5]/30 text-[#2C2D41] px-2 py-0.5 rounded-md font-bold">Ativa</span>
                  </Link>
                  <Link
                    href="/versoes/op2"
                    onClick={() => setIsVersionsDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#2C2D41] hover:bg-[#F8F9FA] hover:text-[#C5ADC5] transition-colors"
                  >
                    <span>Opção 2 (Editorial)</span>
                    <span className="text-xs text-[#B2B5E0]">↗</span>
                  </Link>
                  <Link
                    href="/versoes/op3"
                    onClick={() => setIsVersionsDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#2C2D41] hover:bg-[#F8F9FA] hover:text-[#C5ADC5] transition-colors"
                  >
                    <span>Opção 3 (Teste)</span>
                    <span className="text-xs text-[#B2B5E0]">↗</span>
                  </Link>
                  <div className="border-t border-[#B2B5E0]/20 mt-1 pt-1">
                    <Link
                      href="/versoes"
                      onClick={() => setIsVersionsDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-bold text-center text-[#2C2D41]/80 hover:text-[#C5ADC5]"
                    >
                      Ver Catálogo de Versões &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/colaborar" className="px-6 py-2.5 bg-[#2C2D41] text-white font-bold rounded-xl hover:bg-[#B2B5E0] hover:text-[#2C2D41] transition-all shadow-sm">
              Colaborar
            </Link>
          </nav>

          {/* Botão do Menu Hambúrguer (Mobile) */}
          <button
            type="button"
            className="md:hidden p-2 text-[#2C2D41] hover:text-[#C5ADC5] hover:bg-[#F8F9FA] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5ADC5] transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu principal"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown do Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#B2B5E0]/20 shadow-xl absolute w-full">
          <nav className="flex flex-col px-4 pt-4 pb-6 space-y-2">
            <Link href="/sobre" onClick={toggleMenu} className="block px-4 py-2.5 text-[#2C2D41] font-bold hover:bg-[#F8F9FA] hover:text-[#C5ADC5] rounded-xl transition-colors">
              Sobre
            </Link>
            <Link href="/indicadores" onClick={toggleMenu} className="block px-4 py-2.5 text-[#2C2D41] font-bold hover:bg-[#F8F9FA] hover:text-[#C5ADC5] rounded-xl transition-colors">
              Indicadores
            </Link>
            <Link href="/diretorio" onClick={toggleMenu} className="block px-4 py-2.5 text-[#2C2D41] font-bold hover:bg-[#F8F9FA] hover:text-[#C5ADC5] rounded-xl transition-colors">
              Diretório
            </Link>
            <Link href="/acervo" onClick={toggleMenu} className="block px-4 py-2.5 text-[#2C2D41] font-bold hover:bg-[#F8F9FA] hover:text-[#C5ADC5] rounded-xl transition-colors">
              Acervo
            </Link>
            <Link href="/codigo" onClick={toggleMenu} className="block px-4 py-2.5 text-[#2C2D41] font-bold hover:bg-[#F8F9FA] hover:text-[#C5ADC5] rounded-xl transition-colors">
              Hub de Códigos
            </Link>

            {/* Versões Preservadas no Mobile */}
            <div className="pt-2 pb-1 border-t border-[#B2B5E0]/20">
              <span className="px-4 text-xs font-bold uppercase tracking-wider text-[#2C2D41]/60 block mb-1">
                Versões do Portal
              </span>
              <div className="grid grid-cols-2 gap-2 px-4 py-1">
                <Link
                  href="/versoes/op2"
                  onClick={toggleMenu}
                  className="px-3 py-2 text-xs font-bold text-center bg-[#F8F9FA] text-[#2C2D41] hover:bg-[#B2B5E0]/30 rounded-lg border border-[#B2B5E0]/30"
                >
                  Opção 2
                </Link>
                <Link
                  href="/versoes/op3"
                  onClick={toggleMenu}
                  className="px-3 py-2 text-xs font-bold text-center bg-[#F8F9FA] text-[#2C2D41] hover:bg-[#B2B5E0]/30 rounded-lg border border-[#B2B5E0]/30"
                >
                  Opção 3
                </Link>
              </div>
            </div>

            <Link href="/colaborar" onClick={toggleMenu} className="block mt-4 px-4 py-3 text-center bg-[#2C2D41] text-white font-bold rounded-xl hover:bg-[#B2B5E0] hover:text-[#2C2D41] transition-all shadow-sm">
              Colaborar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}