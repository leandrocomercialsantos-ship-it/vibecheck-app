
import React from 'react';
import { useVibe } from '../context/VibeContext.tsx';

export const RealityReport: React.FC = () => {
  const { transactions } = useVibe();
  
  const savedThisMonth = transactions
    .filter(t => t.type === 'saving')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const impulsesAvoided = transactions.filter(t => t.type === 'saving').length;
  
  // Hypothetical "Life Quality" metric: assume R$ 50 = 1 day of stress-free living
  const lifeDaysGained = Math.floor(savedThisMonth / 50);
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-10">
      <div className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <h2 className="text-3xl font-black italic mb-2">Relatório de Realidade 📊</h2>
        <p className="text-indigo-200 text-sm font-medium">O que você construiu este mês.</p>
        
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Impulsos Evitados</p>
            <p className="text-4xl font-black mt-1">{impulsesAvoided}</p>
          </div>
          <div className="bg-emerald-400 p-6 rounded-[2rem] text-emerald-950">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total Salvo</p>
            <p className="text-3xl font-black mt-1">R$ {savedThisMonth.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-100 p-8 rounded-[3rem] space-y-6 shadow-sm">
        <div className="flex items-center gap-4 bg-teal-50 p-6 rounded-3xl border border-teal-100">
          <div className="text-4xl">⏳</div>
          <div>
            <h4 className="text-teal-900 font-bold">Tempo de Vida Ganho</h4>
            <p className="text-sm text-teal-700">Com suas economias, você ganhou <strong>{lifeDaysGained} dias</strong> de tranquilidade financeira.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800">Seu Dinheiro virou Realidade ✨</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🏥</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">Segurança Básica</p>
              <p className="text-xs text-slate-500">Valor equivalente a planos essenciais</p>
            </div>
            <div className="text-emerald-500 font-black">CONQUISTADO</div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📺</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">Lazer Tangível</p>
              <p className="text-xs text-slate-500">Isso pagaria {Math.floor(savedThisMonth / 40)} meses de Streaming</p>
            </div>
          </div>
        </div>
        
        <button className="w-full py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
          <span>📥</span> Baixar Infográfico PDF
        </button>
      </div>
    </div>
  );
};
