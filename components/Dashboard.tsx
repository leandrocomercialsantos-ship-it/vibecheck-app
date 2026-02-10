
import React, { useState, useMemo } from 'react';
import { Transaction, TransactionCategory } from '../types.ts';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { PelicanLogo } from './PelicanLogo.tsx';

interface DashboardProps {
  gamblingTotal: number;
  totalSaved: number;
  transactions: Transaction[];
  onPanic: () => void;
  onScan: () => void;
}

const CATEGORY_ICONS: Record<TransactionCategory, string> = {
  'Alimentação': '🍕',
  'Lazer': '🎬',
  'Transporte': '🚗',
  'Saúde': '💊',
  'Educação': '📚',
  'Investimento': '📈',
  'Outros': '⚙️'
};

export const Dashboard: React.FC<DashboardProps> = ({ 
  gamblingTotal, 
  totalSaved, 
  onPanic,
  onScan
}) => {
  const { user, transactions, deleteTransaction, updateTransaction } = usePelicano();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Cálculo Automático Pro: Salvos - Perdas
  const netSavings = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === 'saving') return acc + t.amount;
      return acc - t.amount;
    }, 0);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const handleDelete = (id: string) => {
    if (confirm("Deseja excluir este lançamento permanentemente?")) {
      deleteTransaction(id);
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

      {/* Financial Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <div className="glass-premium p-5 md:p-6 rounded-[2.5rem] relative overflow-hidden group border-white/5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Impacto</p>
          <h3 className="text-xl md:text-2xl font-black text-rose-400 tracking-tighter">
            R$ {gamblingTotal.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-rose-500/30 rounded-full"></div>
        </div>

        <div className="glass-premium p-5 md:p-6 rounded-[2.5rem] relative overflow-hidden group border-orange-500/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Saldo Líquido Pelicano</p>
          <h3 className={`text-xl md:text-2xl font-black tracking-tighter ${netSavings >= 0 ? 'text-orange-400' : 'text-rose-400'}`}>
            R$ {netSavings.toLocaleString('pt-BR')}
          </h3>
          <div className="mt-4 h-1 w-8 bg-orange-400/30 rounded-full"></div>
        </div>
      </div>

      {/* AI Premium Action Buttons */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 px-2 md:px-0">
        <button 
          onClick={onScan}
          className="glass-premium p-4 md:p-5 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform">
            📸
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm md:text-base">Scanner</p>
          </div>
        </button>

        <button 
          onClick={onPanic}
          className="glass-premium p-4 md:p-5 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all group border-white/5 active:scale-[0.98]"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform text-amber-400">
            💡
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm md:text-base">Conselho</p>
          </div>
        </button>
      </div>

      {/* Extrato Inteligente Pro */}
      <div className="space-y-4 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.4em]">Extrato Inteligente Pelicano</h3>
          
          {/* Busca por Categoria/Filtro IA */}
          <div className="relative flex-1 max-w-xs">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</div>
            <input 
              type="text"
              placeholder="Filtre por categoria ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <div className="glass-premium p-10 rounded-[2.5rem] text-center border-dashed border-white/10">
              <p className="text-slate-500 text-sm">Nenhuma transação encontrada para sua busca.</p>
            </div>
          ) : (
            filteredTransactions.map((t) => (
              <div 
                key={t.id}
                className="glass-premium p-4 rounded-3xl flex items-center justify-between border-white/5 group transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                    {CATEGORY_ICONS[t.category] || '💰'}
                  </div>
                  <div>
                    {editingId === t.id ? (
                      <input 
                        autoFocus
                        className="bg-transparent border-b border-orange-500 text-sm font-bold text-white outline-none"
                        defaultValue={t.description}
                        onBlur={(e) => {
                          updateTransaction(t.id, { description: e.target.value });
                          setEditingId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateTransaction(t.id, { description: e.currentTarget.value });
                            setEditingId(null);
                          }
                        }}
                      />
                    ) : (
                      <p 
                        className="text-white font-bold text-sm cursor-pointer hover:text-orange-400"
                        onClick={() => setEditingId(t.id)}
                      >
                        {t.description}
                      </p>
                    )}
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">{t.category} • {new Date(t.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className={`font-black text-sm md:text-base ${t.type === 'saving' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.type === 'saving' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR')}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/40 active:scale-90 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
