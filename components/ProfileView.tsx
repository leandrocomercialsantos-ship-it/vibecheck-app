
import React from 'react';
import { useVibe } from '../context/VibeContext.tsx';

interface ProfileViewProps {
  onClose?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onClose }) => {
  const { user, setUser } = useVibe();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, name: e.target.value }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setUser(prev => ({ ...prev, monthlyBudget: val }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 relative">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
        
        {/* Close/Back Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-slate-100 rounded-2xl text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all active:scale-90 z-10"
            title="Voltar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="w-36 h-36 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-2xl transition-transform group-hover:scale-[1.02]">
              <img 
                src={user.avatar} 
                className="w-full h-full object-cover" 
                alt="Avatar do Usuário" 
              />
            </div>
            <label className="absolute -bottom-3 -right-3 bg-orange-600 text-white w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-orange-700 transition-all hover:scale-110 active:scale-95">
              <span className="text-xl">📸</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload} 
              />
            </label>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900">{user.name || 'Seu Nome'}</h2>
            <p className="text-sm text-slate-500 font-medium">{user.email || 'seu@email.com'}</p>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Nome de Exibição
            </label>
            <input 
              className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-800 shadow-sm" 
              placeholder="Digite seu nome..."
              value={user.name} 
              onChange={handleNameChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Orçamento Mensal (Base Pelicano)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
              <input 
                type="number"
                className="w-full p-5 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-800 shadow-sm" 
                placeholder="Ex: 3000"
                value={user.monthlyBudget} 
                onChange={handleBudgetChange}
              />
            </div>
            <p className="text-[10px] text-slate-400 ml-1 font-medium">
              Usado para analisar o impacto das suas decisões financeiras.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4 px-1">
               <h3 className="font-bold text-slate-800">Conexão Bancária 🔒</h3>
               <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-full uppercase">Open Finance</span>
            </div>
            <button 
              onClick={() => setUser(prev => ({...prev, isBankConnected: !prev.isBankConnected}))}
              className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
                user.isBankConnected 
                ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100 shadow-sm' 
                : 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-95'
              }`}
            >
              {user.isBankConnected ? (
                <><span>✅</span> Instituição Conectada</>
              ) : (
                <><span>🏦</span> Conectar via Open Finance</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
