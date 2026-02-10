import React, { useState } from 'react';
import { useVibe } from '../context/VibeContext.tsx';
import { Goal } from '../types.ts';

export const GoalsSystem: React.FC = () => {
  const { goals, addGoal, updateGoalAmount, renameGoal, deleteGoal } = useVibe();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  
  // States para o modal de criação
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');

  // States para o modal de edição/gerenciamento
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

    // Atualiza nome se mudou
    if (editName.trim() && editName !== editingGoal.name) {
      renameGoal(editingGoal.id, editName);
    }

    // Adiciona saldo se houver valor
    const amountToAdd = parseFloat(investValue);
    if (!isNaN(amountToAdd) && amountToAdd > 0) {
      updateGoalAmount(editingGoal.id, amountToAdd);
    }

    setEditingGoal(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 pb-24">
      
      {/* Header Section */}
      <div className="space-y-2 px-2 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Cofre de Sonhos 🎯</h2>
          <p className="text-slate-400 font-medium">Clique em uma meta para gerenciar.</p>
        </div>
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
              const isCompleted = progress >= 100;
              
              return (
                <div 
                  key={goal.id} 
                  onClick={() => openEditModal(goal)}
                  className={`glass-premium p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden group cursor-pointer transition-all hover:bg-white/[0.05] active:scale-[0.99] border-2 ${isCompleted ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)]' : 'border-white/5'}`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000 ${isCompleted ? 'bg-amber-400/10' : 'bg-indigo-500/5'}`}></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white tracking-tight">{goal.name}</h4>
                        {isCompleted && <span className="text-xl animate-bounce">🏆</span>}
                      </div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        Objetivo: R$ {goal.targetAmount.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${isCompleted ? 'from-amber-300 to-amber-500' : 'from-indigo-400 to-violet-400'}`}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      <span>R$ {goal.currentAmount.toLocaleString('pt-BR')}</span>
                      <span>{isCompleted ? 'CONCLUÍDO' : `Restam R$ ${(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR')}`}</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
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

      {/* MODAL: Criar Nova Meta */}
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

      {/* MODAL: Gerenciar Meta (Edit/Invest/Delete) */}
      {editingGoal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="glass-premium p-8 rounded-[3rem] w-full max-w-sm border-white/10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white">Gerenciar Meta</h3>
              <button 
                // Fix: explicit check of the return value from deleteGoal to avoid testing 'void' for truthiness
                onClick={() => {
                  if (deleteGoal(editingGoal.id)) {
                    setEditingGoal(null);
                  }
                }}
                className="text-rose-400 hover:text-rose-500 p-2"
                title="Excluir Meta"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateGoal} className="space-y-6">
              {/* Renomear */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Meta</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              {/* Adicionar Saldo */}
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

      {/* Credits */}
      <div className="text-center pt-4">
        <p className="text-[10px] text-slate-600 italic font-medium tracking-widest">
          by Leandro Dos Santos
        </p>
      </div>
    </div>
  );
};
