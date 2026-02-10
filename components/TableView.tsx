
import React from 'react';
import { usePelicano } from '../context/PelicanoContext.tsx';

export const TableView: React.FC = () => {
  const { transactions, deleteTransaction, updateTransaction } = usePelicano();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 pb-32">
      <div className="px-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Planilha de Controle 📊</h2>
          <p className="text-slate-400 text-xs font-medium">Gestão minuciosa de cada centavo.</p>
        </div>
      </div>

      <div className="glass-premium rounded-[2.5rem] overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-500 italic">
                    Nenhum lançamento registrado no seu ninho.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                      {new Date(t.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        className="bg-transparent border-none text-white font-medium focus:ring-1 focus:ring-orange-500/50 rounded px-1 outline-none w-full"
                        defaultValue={t.description}
                        onBlur={(e) => updateTransaction(t.id, { description: e.target.value })}
                      />
                    </td>
                    <td className={`px-6 py-4 font-black whitespace-nowrap ${t.type === 'gain' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      R$ {Math.abs(t.amount).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-rose-500/40 hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-[2rem] text-center">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
          Os dados editados acima refletem instantaneamente no seu Saldo Líquido Pelicano e nos seus Cofres de Sonhos.
        </p>
      </div>
    </div>
  );
};
