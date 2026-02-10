
import React, { useState } from 'react';

interface QuickActionsProps {
  onAddSaving: (amount: number) => void;
  onAddLoss: (amount: number) => void;
  onOpenCrisis: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAddSaving, onAddLoss, onOpenCrisis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<'saving' | 'loss' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleConfirm = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) return;

    if (showModal === 'saving') onAddSaving(amount);
    if (showModal === 'loss') onAddLoss(amount);

    setInputValue('');
    setShowModal(null);
    setIsOpen(false);
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate speech-to-text
    setTimeout(() => {
      setInputValue('50');
      setIsRecording(false);
      alert('IA: Ouvi "Cinquenta Reais". Adicionando ao valor!');
    }, 2000);
  };

  return (
    <>
      <div className="fixed bottom-24 md:bottom-8 right-6 flex flex-col items-end gap-3 z-50">
        {isOpen && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={() => setShowModal('saving')}
              className="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all"
            >
              <span>✨ Evitei um gasto</span>
            </button>
            <button 
              onClick={() => setShowModal('loss')}
              className="bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-rose-600 transition-all"
            >
              <span>📉 Registrei uma perda</span>
            </button>
            <button 
              onClick={onOpenCrisis}
              className="bg-orange-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-all animate-pulse"
            >
              <span>❤️ SOS Crise</span>
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl transition-all ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-blue-600 hover:scale-110'}`}
        >
          +
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-800">
                {showModal === 'saving' ? 'Parabéns pela economia! ✨' : 'Vamos registrar isso. ✍️'}
              </h3>
              <button 
                onClick={handleVoiceInput}
                className={`p-2 rounded-full transition-all ${isRecording ? 'bg-rose-100 text-rose-500 animate-pulse' : 'bg-slate-100 text-slate-400'}`}
                title="Falar valor"
              >
                🎙️
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              {showModal === 'saving' 
                ? 'Qual o valor que você deixou de gastar/apostar agora?' 
                : 'Qual foi o valor perdido nesta ocasião?'}
            </p>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">R$</span>
              <input 
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 rounded-2xl pl-12 pr-4 py-4 text-2xl font-bold outline-none transition-all"
                placeholder="0,00"
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(null)}
                className="flex-1 py-3 font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirm}
                className={`flex-1 py-3 font-semibold text-white rounded-xl shadow-lg transition-transform active:scale-95 ${
                  showModal === 'saving' ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
