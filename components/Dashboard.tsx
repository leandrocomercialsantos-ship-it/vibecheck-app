
import React from 'react';
import { Transaction } from '../types.ts';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { PelicanLogo } from './PelicanLogo.tsx';

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
  onPanic,
  onScan
}) => {
  const { user } = usePelicano();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6 md:space-y-10 pb-20">
      
      {/* Centered Avatar & Greeting Section */}
      <div className="flex flex-col items-center text-center space-y-4 pt-2 md:pt-4">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-orange-400/50 p-1 bg-slate-900/50 backdrop-blur-md shadow-[0_0_30px_rgba(251,146,60,0.3)]">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-4 border-slate-950 flex items-center justify-center text-[10px] shadow-lg">
            <PelicanLogo className="w-4 h-4 text-slate-900" />
          </div>
        </div>
        <div className="space-y-1 px-4">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">{user.name || 'Investidor'}</span>!
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium">Pronto para proteger seu patrimônio no Pelicano Invest?</p>
        </div>
      </div>

      {/* Financial Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <div className="glass-premium p-5 md:p-6 rounded-[2.5rem] relative overflow-hidden group border-white/5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Perdido</p>
          <h3 className="text-xl md:text-2xl font-black text-rose-400 tracking-tighter">
            R$ {gamblingTotal.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-rose-500/30 rounded-full"></div>
        </div>

        <div className="glass-premium p-5 md:p-6 rounded-[2.5rem] relative overflow-hidden group border-orange-500/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Dinheiro Salvo</p>
          <h3 className="text-xl md:text-2xl font-black text-orange-400 tracking-tighter">
            R$ {totalSaved.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-orange-400/30 rounded-full"></div>
        </div>
      </div>

      {/* AI Premium Action Buttons */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.4em] px-4">Ações de Proteção</h3>
        <div className="grid grid-cols-1 gap-3 px-2 md:px-0">
          
          <button 
            onClick={onScan}
            className="glass-premium p-4 md:p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform">
                📸
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-base md:text-lg">Scanner de Impulso</p>
                <p className="text-slate-500 text-[10px] md:text-xs">Análise técnica pré-compra</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button 
            onClick={onPanic}
            className="glass-premium p-4 md:p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform text-amber-400">
                💡
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-base md:text-lg">Conselho Pelicano</p>
                <p className="text-slate-500 text-[10px] md:text-xs">Suporte SOS e Estratégia</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};
