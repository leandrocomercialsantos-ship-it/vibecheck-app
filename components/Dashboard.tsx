
import React, { useState, useMemo } from 'react';
import { Transaction, TransactionCategory } from '../types.ts';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { PelicanLogo } from './PelicanLogo.tsx';

interface DashboardProps {
  onPanic: () => void;
  onScan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onPanic,
  onScan
}) => {
  const { user, transactions, addTransaction } = usePelicano();
  const [showQuickForm, setShowQuickForm] = useState<'gain' | 'loss' | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const totalSaved = useMemo(() => {
    return transactions.filter(t => t.type === 'gain').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  }, [transactions]);

  const gamblingTotal = useMemo(() => {
    return transactions.filter(t => t.type === 'loss').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  }, [transactions]);

  const netSavings = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0 && showQuickForm) {
      addTransaction(val, showQuickForm, description || (showQuickForm === 'gain' ? 'Ganho Rápido' : 'Gasto Rápido'), 'Outros');
      setAmount('');
      setDescription('');
      setShowQuickForm(null);
    }
  };

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
          <p className="text-slate-400 text-xs md:text-sm font-medium">Status do seu ninho Pro ativado.</p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-premium p-5 rounded-[2.5rem] relative overflow-hidden group border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Impacto (Gastos)</p>
          <h3 className="text-xl font-black text-rose-400 tracking-tighter">
            R$ {gamblingTotal.toLocaleString('pt-BR')}
          </h3>
        </div>

        <div className="glass-premium p-5 rounded-[2.5rem] relative overflow-hidden group border-orange-500/20">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Saldo Líquido Pelicano</p>
          <h3 className={`text-xl font-black tracking-tighter ${netSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            R$ {netSavings.toLocaleString('pt-BR')}
          </h3>
        </div>
      </div>

      {/* LANÇAMENTOS INSTANTÂNEOS */}
      <div className="flex gap-4">
        <button 
          onClick={() => setShowQuickForm('loss')}
          className="flex-1 py-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black rounded-3xl shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:bg-rose-500/20 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          🔻 Gastei
        </button>
        <button 
          onClick={() => setShowQuickForm('gain')}
          className="flex-1 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black rounded-3xl shadow-[0_0_15px_rgba(52,211,153,0.15)] hover:bg-emerald-500/20 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          🔺 Guardei/Ganhei
        </button>
      </div>

      {/* Quick Add Form Modal */}
      {showQuickForm && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className={`glass-premium p-8 rounded-[3rem] w-full max-w-sm border-2 animate-in zoom-in-95 ${showQuickForm === 'gain' ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
            <h3 className={`text-2xl font-black mb-6 text-center ${showQuickForm === 'gain' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {showQuickForm === 'gain' ? 'Novo Ganho ✨' : 'Novo Gasto 📉'}
            </h3>
            <form onSubmit={handleQuickAdd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Valor</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    autoFocus
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white font-bold outline-none focus:border-orange-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descrição</label>
                <input 
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-orange-500"
                  placeholder="Opcional"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowQuickForm(null)} className="flex-1 py-4 text-slate-400 font-bold">Cancelar</button>
                <button type="submit" className={`flex-1 py-4 font-black rounded-2xl text-slate-950 ${showQuickForm === 'gain' ? 'bg-emerald-400' : 'bg-rose-400'}`}>SALVAR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Outras Ações */}
      <div className="grid grid-cols-2 gap-3 px-2">
        <button onClick={onScan} className="glass-premium p-4 rounded-3xl flex items-center gap-4 border-white/5">
          <div className="w-10 h-10 bg-orange-500/10 rounded-2xl flex items-center justify-center text-xl">📸</div>
          <p className="text-white font-bold text-sm">Scanner</p>
        </button>
        <button onClick={onPanic} className="glass-premium p-4 rounded-3xl flex items-center gap-4 border-white/5">
          <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-xl">💡</div>
          <p className="text-white font-bold text-sm">Conselho</p>
        </button>
      </div>
    </div>
  );
};
