
import React, { useMemo } from 'react';
import { usePelicano } from '../context/PelicanoContext.tsx';

export const AnalysisView: React.FC = () => {
  const { transactions } = usePelicano();

  const data = useMemo(() => {
    // Pegar as últimas 7 transações para o gráfico
    return [...transactions].slice(0, 7).reverse();
  }, [transactions]);

  const maxVal = useMemo(() => {
    const vals = data.map(t => Math.abs(t.amount));
    return Math.max(...vals, 100);
  }, [data]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 pb-32">
      <div className="px-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Análise de Fluxo 📈</h2>
        <p className="text-slate-400 text-xs font-medium">Seu capital em movimento constante.</p>
      </div>

      <div className="glass-premium p-8 rounded-[3rem] border-white/5 h-80 flex flex-col">
        <div className="flex-1 flex items-center justify-around relative">
          {/* Linha de Eixo Zero */}
          <div className="absolute left-0 right-0 h-px bg-white/10 z-0"></div>
          
          {data.length === 0 ? (
            <p className="text-slate-500 text-sm italic">Adicione lançamentos para ver o gráfico.</p>
          ) : (
            data.map((t, idx) => {
              const heightPercentage = (Math.abs(t.amount) / maxVal) * 80; // max 80%
              const isGain = t.type === 'gain';
              
              return (
                <div key={t.id} className="flex flex-col items-center group relative h-full justify-center w-8">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-[10px] text-white p-2 rounded-lg whitespace-nowrap z-50">
                    {t.description}: R$ {Math.abs(t.amount)}
                  </div>

                  <div 
                    className={`w-4 rounded-full transition-all duration-700 shadow-lg ${isGain ? 'bg-emerald-400 shadow-emerald-400/20' : 'bg-rose-400 shadow-rose-400/20'}`}
                    style={{ 
                      height: `${heightPercentage}%`,
                      transform: isGain ? `translateY(-50%)` : `translateY(50%)`
                    }}
                  ></div>
                  
                  <span className="absolute bottom-[-20px] text-[8px] text-slate-500 font-bold uppercase truncate w-12 text-center">
                    {new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="glass-premium p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Taxa de Sucesso</p>
          <p className="text-2xl font-black text-emerald-400">
            {transactions.length > 0 ? ((transactions.filter(t => t.type === 'gain').length / transactions.length) * 100).toFixed(0) : 0}%
          </p>
        </div>
        <div className="glass-premium p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Média Lançamento</p>
          <p className="text-2xl font-black text-white">
            R$ {transactions.length > 0 ? (transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0) / transactions.length).toFixed(0) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
