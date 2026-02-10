
import React from 'react';
import { useVibe } from '../context/VibeContext.tsx';

export const RealityReport: React.FC = () => {
  const { transactions } = useVibe();
  
  const savedThisMonth = transactions
    .filter(t => t.type === 'saving')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const impulsesAvoided = transactions.filter(t => t.type === 'saving').length;
  
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

      <div className="bg-white border-2 border-slate-100 p-8 rounded-[3rem] space-y-6">
        <h3 className="text-xl font-bold text-slate-800">Seu Dinheiro virou Realidade ✨</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🏥</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">Plano de Saúde</p>
              <p className="text-xs text-slate-500">Garantido com as economias</p>
            </div>
            <div className="text-emerald-500 font-black">PAGO</div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🍎</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">Feira da Semana</p>
              <p className="text-xs text-slate-500">Alimentação de qualidade</p>
            </div>
            <div className="text-emerald-500 font-black">PAGO</div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🌟</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-400">Restante para Sonhos</p>
              <p className="text-xs text-slate-400">R$ {Math.max(0, savedThisMonth - 350).toLocaleString('pt-BR')}</p>
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
