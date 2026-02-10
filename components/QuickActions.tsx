
import React, { useState } from 'react';
import { TransactionCategory } from '../types.ts';

interface QuickActionsProps {
  onAddSaving: (amount: number, category: TransactionCategory) => void;
  onAddLoss: (amount: number, category: TransactionCategory) => void;
  onOpenCrisis: () => void;
}

const CATEGORIES: TransactionCategory[] = [
  'Alimentação', 'Lazer', 'Transporte', 'Saúde', 'Educação', 'Investimento', 'Outros'
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onAddSaving, onAddLoss, onOpenCrisis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<'saving' | 'loss' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory>('Outros');
  const [isRecording, setIsRecording] = useState(false);

  const handleConfirm = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) return;

    if (showModal === 'saving') onAddSaving(amount, selectedCategory);
    if (showModal === 'loss') onAddLoss(amount, selectedCategory);

    setInputValue('');
    setShowModal(null);
    setIsOpen(false);
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setInputValue('50');
      setIsRecording(false);
      alert('IA Pelicano: Identifiquei "Cinquenta Reais". Valor inserido!');
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-24 md:bottom-8 right-6 flex flex-col items-end gap-3 z-50">
        {isOpen && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={() => setShowModal('saving')}
              className="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all active:scale-95"
            >
              <span>✨ Evitei Gasto</span>
            </button>
            <button 
              onClick={() => setShowModal('loss')}
              className="bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-rose-600 transition-all active:scale-95"
            >
              <span>📉 Perda/Gasto</span>
            </button>
            <button 
              onClick={onOpenCrisis}
              className="bg-orange-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-all animate-pulse active:scale-95"
            >
              <span>❤️ SOS Pelicano</span>
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl transition-all ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-orange-600 hover:scale-110 shadow-orange-500/20'}`}
        >
          {isOpen ? '✕' : '+'}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="glass-premium rounded-[3rem] p-8 w-full max-w-sm animate-in zoom-in-95 duration-200 border border-white/10 shadow-3xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white">
                {showModal === 'saving' ? 'Parabéns pela Proteção! ✨' : 'Recalibrando o Ninho. ✍️'}
              </h3>
              <button 
                onClick={handleVoiceInput}
                className={`p-2 rounded-full transition-all ${isRecording ? 'bg-rose-100 text-rose-500 animate-pulse' : 'bg-white/10 text-slate-400 hover:text-white'}`}
              >
                🎙️
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">R$</span>
                <input 
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-2xl pl-12 pr-4 py-4 text-2xl font-bold text-white outline-none transition-all shadow-inner"
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoria Pro</label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all ${
                        selectedCategory === cat 
                        ? 'bg-orange-600 border-orange-500 text-white' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirm}
                  className={`flex-1 py-4 font-black text-slate-950 rounded-2xl shadow-xl transition-all active:scale-95 ${
                    showModal === 'saving' ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                >
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
