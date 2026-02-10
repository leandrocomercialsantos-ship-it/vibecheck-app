
import React from 'react';
import { LEGAL_TEXT } from '../constants.ts';

interface LegalNoticeProps {
  onClose: () => void;
  isModal?: boolean;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ onClose, isModal = false }) => {
  return (
    <div className={`
      animate-in fade-in zoom-in-95 duration-500 
      bg-slate-900 border border-white/10 shadow-2xl relative flex flex-col
      ${isModal ? 'fixed inset-4 md:inset-auto md:w-[500px] md:h-auto max-h-[90vh] z-[9999] rounded-[2.5rem] p-6 md:p-10' : 'rounded-[2.5rem] p-8 md:p-12 max-h-[85vh]'}
    `}>
      {/* Botão X no topo (Apenas Visual ou Saída Rápida) */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/5 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-90 z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <header className="space-y-2 mb-6 pr-10">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight">{LEGAL_TEXT.title}</h1>
        <div className="flex flex-col gap-1">
          <span className="text-orange-400 font-black text-[10px] uppercase tracking-widest">{LEGAL_TEXT.version}</span>
          <span className="text-slate-500 text-[10px] font-bold">{LEGAL_TEXT.author}</span>
        </div>
      </header>

      {/* Area de Scroll Interna */}
      <div 
        className="flex-1 overflow-y-auto pr-2 mb-8 space-y-8 custom-scrollbar"
        style={{ maxHeight: isModal ? '400px' : 'none' }}
      >
        <p className="text-sm text-slate-400 font-medium italic border-l-2 border-orange-500/50 pl-4 py-1">
          {LEGAL_TEXT.intro}
        </p>

        {LEGAL_TEXT.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              {section.heading}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed text-justify">
              {section.content}
            </p>
          </section>
        ))}

        <div className="pt-6 border-t border-white/5">
          <p className="text-[10px] text-slate-500 italic text-center leading-relaxed">
            {LEGAL_TEXT.footer}
          </p>
        </div>
      </div>

      {/* Botão de Fechar no Final */}
      <div className="flex justify-center pt-2">
        <button 
          onClick={onClose}
          className="w-full md:w-auto px-10 py-4 bg-orange-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-500 transition-all shadow-xl active:scale-95 shadow-orange-500/20"
        >
          FECHAR E CONCORDAR
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.5);
        }
      `}</style>
    </div>
  );
};
