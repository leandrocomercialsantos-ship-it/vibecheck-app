
import React from 'react';
import { Goal } from '../types.ts';

interface GoalsSystemProps {
  goals: Goal[];
  totalSaved: number;
}

export const GoalsSystem: React.FC<GoalsSystemProps> = ({ goals, totalSaved }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-800">Suas Metas Reais</h2>
        <p className="text-slate-500">Transformando vícios em conquistas concretas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
          return (
            <div key={goal.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800">{goal.name}</h4>
                  <p className="text-sm text-slate-500">
                    R$ {goal.currentAmount.toLocaleString('pt-BR')} de R$ {goal.targetAmount.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider">
                <span>Começo</span>
                <span>Objetivo</span>
              </div>
            </div>
          );
        })}
        
        {/* Add New Goal Card */}
        <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all group">
          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">+</span>
          <span className="font-semibold">Nova Meta de Consumo</span>
        </button>
      </div>

      <div className="bg-blue-600 p-6 rounded-3xl text-white mt-8 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-blue-200">
        <div className="text-4xl">💡</div>
        <div>
          <h4 className="font-bold text-lg mb-1">Dica de Sucesso</h4>
          <p className="text-blue-100 text-sm">
            Toda vez que sentir o impulso de apostar, pare por 5 minutos e adicione o valor que você ia perder diretamente em uma de suas metas. O prazer de ver o progresso real supera a ilusão do ganho fácil.
          </p>
        </div>
      </div>
    </div>
  );
};
