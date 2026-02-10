
import React, { useState } from 'react';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { Goal } from '../types.ts';

export const GoalsSystem: React.FC = () => {
  const { goals, addGoal, updateGoalAmount, renameGoal, deleteGoal } = usePelicano();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const [editName, setEditName] = useState('');
  const [investValue, setInvestValue] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTarget) return;
    addGoal(newName, parseFloat(newTarget));
    setNewName('');
    setNewTarget('');
    setShowAddModal(false);
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setEditName(goal.name);
    setInvestValue('');
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;

    if (editName.trim() && editName !== editingGoal.name) {
      renameGoal(editingGoal.id, editName);
    }

    const amountToAdd = parseFloat(investValue);
    if (!isNaN(amountToAdd) && amountToAdd > 0) {
      updateGoalAmount(editingGoal.id, amountToAdd);
    }

    setEditingGoal(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6 md:space-y-8 pb-32">
      
      <div className="space-y-1 px-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Cofre de Sonhos 🎯</h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium">Toque para gerenciar seus ativos.</p>
        </div>
      </div>

      <div className="space-y-5">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16 px-6 text-center space-y-8 glass-premium rounded-[3rem] border-dashed border-white/10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-500/10 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-float">
              ✨
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-white">Nenhum sonho cadastrado</h3>
              <p className="text-slate-500 text-xs max-w-xs mx-auto">Defina seu primeiro grande objetivo para o Pelicano te ajudar.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-8 py-4 bg-orange-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(251,146,60,0.4)] hover:scale-105 active:scale-95 transition-all text-sm"
            >
              CRIAR PRIMEIRA META
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {goals.map((goal) => {
              const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
              const isCompleted = progress >= 100;
              
              return (
                <div 
                  key={goal.id} 
                  onClick={() => openEditModal(goal)}
                  className={`glass-premium p-6 md:p-8 rounded-[2.5rem] space-y-5 relative overflow-hidden group cursor-pointer transition-all hover:bg-white/[0.05] active:scale-[0.99] border-2 ${isCompleted ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'border-white/5'}`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000 ${isCompleted ? 'bg-amber-400/10' : 'bg-orange-500/5'}`}></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg md:text-xl font-bold text-white tracking-tight truncate max-w-[150px] md:max-w-xs">{goal.name}</h4>
                        {isCompleted && <span className="text-lg animate-bounce">🏆</span>}
                      </div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Objetivo: R$ {goal.targetAmount.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${isCompleted ? 'from-amber-300 to-amber-500' : 'from-orange-400 to-amber-300'}`}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      <span>R$ {goal.currentAmount.toLocaleString('pt-BR')}</span>
                      <span>{isCompleted ? 'CONCLUÍDO' : `Restam R$ ${(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR')}`}</span>
                    </div>
                    <div className="h-3 md:h-4 bg-white/5 rounded-full overflow-hidden p-1">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_15px_rgba(251,146,60,0.5)]'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full py-8 md:py-12 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <span className="text-3xl md:text-4xl mb-2 group-hover:scale-125 transition-transform">➕</span>
              <span className="font-black text-[10px] uppercase tracking-widest">Nova Meta</span>
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="glass-premium p-8 rounded-[3rem] w-full max-w-sm border-orange-500/30 animate-in zoom-in-95">
            <h3 className="text-2xl font-black text-white mb-8 text-center">Novo Objetivo ✨</h3>
            <form onSubmit={handleCreateGoal} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Meta</label>
                <input 
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-orange-500 transition-all"
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
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-12 text-white font-bold outline-none focus:border-orange-500 transition-all"
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
                  className="flex-1 py-4 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:bg-orange-500 transition-all"
                >
                  CRIAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingGoal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="glass-premium p-8 rounded-[3rem] w-full max-w-sm border-white/10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white">Gerenciar Meta</h3>
              <button 
                onClick={() => {
                  if (deleteGoal(editingGoal.id)) {
                    setEditingGoal(null);
                  }
                }}
                className="text-rose-400 hover:text-rose-500 p-2 transition-transform active:scale-90"
                title="Excluir Meta"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateGoal} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Meta</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-orange-500 transition-all"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-1">Adicionar Saldo 💰</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-black">R$</span>
                  <input 
                    type="number"
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 pl-10 text-emerald-400 font-black text-xl outline-none focus:border-emerald-500 transition-all"
                    placeholder="0.00"
                    value={investValue}
                    onChange={(e) => setInvestValue(e.target.value)}
                  />
                </div>
                <p className="text-[9px] text-slate-500 ml-1">Saldo atual: R$ {editingGoal.currentAmount.toLocaleString('pt-BR')}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors"
                >
                  Fechar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-white text-slate-950 font-black rounded-2xl shadow-xl hover:bg-slate-100 transition-all"
                >
                  SALVAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
