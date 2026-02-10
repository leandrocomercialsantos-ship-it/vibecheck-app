
import React, { useState } from 'react';
import { useVibe } from '../context/VibeContext.tsx';

export const GoalsSystem: React.FC = () => {
  const { goals, addGoal, updateGoalAmount } = useVibe();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState<string | null>(null);
  
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [investValue, setInvestValue] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTarget) return;
    addGoal(newName, parseFloat(newTarget));
    setNewName('');
    setNewTarget('');
    setShowAddModal(false);
  };

  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showInvestModal || !investValue) return;
    updateGoalAmount(showInvestModal, parseFloat(investValue));
    setInvestValue('');
    setShowInvestModal(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 pb-24">
      
      {/* Header Section */}
      <div className="space-y-2 px-2">
        <h2 className="text-3xl font-black text-white tracking-tight">Cofre de Sonhos 🎯</h2>
        <p className="text-slate-400 font-medium">Transforme economias em conquistas reais.</p>
      </div>

      {/* Goals Content */}
      <div className="space-y-6">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-8 glass-premium rounded-[3rem] border-dashed border-white/10">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center text-5xl animate-float">
              ✨
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Nenhum sonho cadastrado ainda</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Comece definindo o seu primeiro grande objetivo para o Guardião te ajudar.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              CRIAR PRIMEIRA META
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {goals.map((goal) => {
              const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
              return (
                <div key={goal.id} className="glass-premium p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white tracking-tight">{goal.name}</h4>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        Objetivo: R$ {goal.targetAmount.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      <span>R$ {goal.currentAmount.toLocaleString('pt-BR')}</span>
                      <span>Restam R$ {(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => setShowInvestModal(goal.id)}
                      className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      <span>💰</span> ADICIONAR SALDO
                    </button>
                  </div>
                </div>
              );
            })}
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full py-12 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <span className="text-4xl mb-2 group-hover:scale-125 transition-transform">➕</span>
              <span className="font-black text-xs uppercase tracking-widest">Adicionar Nova Meta</span>
            </button>
          </div>
        )}
      </div>

      {/* Success Tip */}
      <div className="glass-premium p-8 rounded-[2.5rem] border-indigo-500/20 flex gap-6 items-center">
        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl">💡</div>
        <div>
          <h4 className="font-bold text-white mb-1">Dica de Sucesso</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Sempre que vencer um impulso, adicione o valor aqui. Ver o progresso real libera mais dopamina que o ganho fácil das apostas.
          </p>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center pt-4">
        <p className="text-[10px] text-slate-600 italic font-medium tracking-widest">
          by Leandro Dos Santos
        </p>
      </div>

      {/* MODAL: Add New Goal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="glass-premium p-8 rounded-[3rem] w-full max-w-sm border-indigo-500/30 animate-in zoom-in-95">
            <h3 className="text-2xl font-black text-white mb-8 text-center">Novo Objetivo ✨</h3>
            <form onSubmit={handleCreateGoal} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Meta</label>
                <input 
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                  placeholder="Ex: Viagem para Europa"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Valor Objetivo</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                  <input 
                    type="number"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-12 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                    placeholder="0.00"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-500 transition-all"
                >
                  CRIAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Money to Goal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="glass-premium p-8 rounded-[3rem] w-full max-w-sm border-emerald-500/30 animate-in zoom-in-95">
            <h3 className="text-2xl font-black text-white mb-2 text-center">Alimentar Sonho 💰</h3>
            <p className="text-slate-500 text-xs text-center mb-8">Quanto você salvou hoje?</p>
            <form onSubmit={handleInvest} className="space-y-6">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-xl">R$</span>
                <input 
                  autoFocus
                  type="number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pl-16 text-white font-black text-3xl outline-none focus:border-emerald-500 transition-all"
                  placeholder="0.00"
                  value={investValue}
                  onChange={(e) => setInvestValue(e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowInvestModal(null)}
                  className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-emerald-500 text-emerald-950 font-black rounded-2xl shadow-xl hover:bg-emerald-400 transition-all"
                >
                  INVESTIR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
