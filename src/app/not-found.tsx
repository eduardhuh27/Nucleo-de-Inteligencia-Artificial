import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] text-center px-4 font-sans text-[#2C2D41]">
      <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30 flex flex-col items-center max-w-xl mx-auto">
        
        
        <div className="w-30 h-30 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
          
        
        <h1 className="text-6xl md:text-8xl font-serif font-black text-[#B2B5E0] mb-2 tracking-tighter">
          404
        </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-lg text-[#2C2D41]/70 mb-10 font-light leading-relaxed max-w-md">
          O documento ou diretório que você procura foi movido, excluído ou não existe em nosso acervo.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#2C2D41] text-white font-bold rounded-xl hover:bg-[#B2B5E0] hover:text-[#2C2D41] transition-all shadow-sm text-lg"
        >
          <span>&larr;</span> Voltar para a Home
        </Link>
        
      </div>
    </main>
  );
}