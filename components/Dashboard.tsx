
import React from 'react';
import { Transaction, OpportunityItem } from '../types';
import { OPPORTUNITY_ITEMS } from '../constants';

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
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-10">
      {/* Panic Button Section */}
      <div className="relative group">
        <button 
          onClick={onPanic}
          className="w-full py-8 bg-rose-500 text-white rounded-[2.5rem] shadow-2xl shadow-rose-200 flex flex-col items-center gap-2 hover:bg-rose-600 transition-all active:scale-95 border-8 border-white group"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:scale-110 transition-transform">
            🆘
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter mt-2">Botão de Pânico</span>
          <span className="text-xs font-bold text-rose-100 uppercase tracking-widest opacity-80">Bateu a vontade? Clica aqui agora.</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onScan}
          className="flex flex-col items-center gap-2 p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all group"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform">📸</span>
          <div className="text-center">
            <p className="font-bold text-sm">Scanner de Impulso</p>
            <p className="text-[10px] text-slate-400 font-medium">Verifique antes de comprar</p>
          </div>
        </button>
        <div className="flex flex-col items-center gap-2 p-6 bg-emerald-400 text-emerald-950 rounded-[2rem] shadow-xl">
          <span className="text-3xl">🌿</span>
          <div className="text-center">
            <p className="font-bold text-sm">Vibe do Dia</p>
            <p className="text-[10px] font-bold uppercase opacity-60">Em Equilíbrio</p>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 relative">Total Perdido em Bets</p>
          <h2 className="text-4xl font-black text-rose-500 relative tracking-tighter">R$ {gamblingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
          <p className="mt-4 text-[10px] text-slate-400 font-medium italic relative">"Cada centavo perdido é um sonho adiado."</p>
        </div>

        <div className="bg-indigo-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2 relative">Dinheiro Salvo ✨</p>
          <h2 className="text-4xl font-black text-emerald-400 relative tracking-tighter">R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
          <p className="mt-4 text-[10px] text-indigo-300/60 font-medium italic relative">Continue protegendo seus sonhos, Alex.</p>
        </div>
      </div>

      {/* Opportunity Cost */}
      <section className="bg-amber-50 p-8 rounded-[3rem] border-2 border-amber-100/50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-amber-900 tracking-tight">O que você poderia ter? 💎</h3>
          <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Custo de Realidade</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {OPPORTUNITY_ITEMS.map((item, idx) => {
            const count = Math.floor(gamblingTotal / item.cost);
            return (
              <div key={idx} className={`p-5 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all ${count > 0 ? 'bg-white border-amber-200 shadow-sm' : 'opacity-30 border-transparent grayscale'}`}>
                <span className="text-3xl mb-3">{item.icon}</span>
                <h4 className="font-black text-slate-800 text-[9px] uppercase tracking-tighter leading-tight mb-2">{item.name}</h4>
                <div className={`text-2xl font-black ${count > 0 ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {count}x
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-xl font-bold text-slate-800">Histórico de Decisões</h3>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Ver Completo</button>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          {transactions.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <span className="text-5xl block animate-float">🌱</span>
              <p className="text-slate-400 font-bold text-sm">Seu jardim financeiro está calmo.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {transactions.slice(0, 4).map((t) => (
                <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                      t.type === 'gambling' ? 'bg-rose-50 text-rose-500' : 
                      'bg-emerald-50 text-emerald-500'
                    }`}>
                      {t.type === 'gambling' ? '💔' : '🛡️'}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm leading-tight">{t.description}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className={`font-black text-lg tracking-tighter ${t.type === 'gambling' ? 'text-rose-600' : 'text-emerald-500'}`}>
                    {t.type === 'gambling' ? '-' : '+'} R$ {t.amount.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
