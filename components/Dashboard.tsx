
import React from 'react';
import { Transaction } from '../types.ts';
import { useVibe } from '../context/VibeContext.tsx';

interface DashboardProps {
  gamblingTotal: number;
  totalSaved: number;
  transactions: Transaction[];
  onPanic: () => void;
  onScan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  gamblingTotal, 
  totalSaved, 
  transactions, 
  onPanic,
  onScan
}) => {
  const { user } = useVibe();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10 pb-20">
      
      {/* Centered Avatar & Greeting Section */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative w-28 h-28 rounded-full border-2 border-indigo-400/50 p-1 bg-slate-900/50 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center text-[10px] shadow-lg shadow-emerald-500/20">
            🛡️
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{user.name || 'Guerreiro'}</span>!
          </h2>
          <p className="text-slate-400 text-sm font-medium">Pronto para proteger seu patrimônio hoje?</p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-premium p-6 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Perdido</p>
          <h3 className="text-2xl font-black text-rose-400 tracking-tighter">
            R$ {gamblingTotal.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-rose-500/30 rounded-full"></div>
        </div>

        <div className="glass-premium p-6 rounded-[2.5rem] relative overflow-hidden group border-indigo-500/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Dinheiro Salvo</p>
          <h3 className="text-2xl font-black text-emerald-400 tracking-tighter">
            R$ {totalSaved.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-emerald-500/30 rounded-full"></div>
        </div>
      </div>

      {/* AI Premium Action Buttons */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] px-2">Ações do Guardião</h3>
        <div className="grid grid-cols-1 gap-3">
          
          {/* 1st: Scanner de Impulso */}
          <button 
            onClick={onScan}
            className="glass-premium p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📸
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Scanner de Impulso</p>
                <p className="text-slate-500 text-xs">Analise antes de gastar</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* 2nd: Vibe do Dia */}
          <button 
            className="glass-premium p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform text-emerald-400">
                ✨
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Vibe do Dia</p>
                <p className="text-slate-500 text-xs">Como está sua mente hoje?</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 rounded-full">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Estável</span>
            </div>
          </button>

          {/* 3rd: Conselho Financeiro */}
          <button 
            onClick={onPanic}
            className="glass-premium p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                💡
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Conselho Financeiro</p>
                <p className="text-slate-500 text-xs">Suporte SOS e Ideias de IA</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
            </div>
          </button>

        </div>
      </div>

      {/* Creator Credits */}
      <div className="pt-8 text-center">
        <p className="text-[10px] text-slate-600 italic font-medium tracking-widest">
          by Leandro Dos Santos
        </p>
      </div>

    </div>
  );
};
