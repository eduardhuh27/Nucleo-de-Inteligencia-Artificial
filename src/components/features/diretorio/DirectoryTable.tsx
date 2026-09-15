export function TabelaDiretorio({ dados }: { dados: any[] }) {
  return (
    // WRAPPER MÁGICO: Garante scroll horizontal apenas na tabela
    <div className="w-full overflow-x-auto bg-white rounded-3xl border border-[#B2B5E0]/30 shadow-sm">
      
      <table className="w-full min-w-[700px] text-left text-sm text-[#2C2D41]/80">
        <thead className="bg-[#F8F9FA] border-b border-[#B2B5E0]/30 text-[#2C2D41]">
          <tr>
            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Iniciativa</th>
            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Setor</th>
            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#B2B5E0]/20">
          {dados.map((item, index) => (
            <tr key={index} className="hover:bg-[#C5ADC5]/10 transition-colors">
              <td className="px-6 py-4 font-bold text-[#2C2D41]">{item.nome}</td>
              <td className="px-6 py-4">{item.setor}</td>
              <td className="px-6 py-4 text-right">
                {/* Badge de status padronizado com o design system */}
                <span className="inline-block px-3 py-1 bg-[#B2B5E0]/30 text-[#2C2D41] rounded-full text-xs font-bold uppercase tracking-wider">
                  Ativo
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}