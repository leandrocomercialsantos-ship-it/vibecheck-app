
import React from 'react';
import { LEGAL_TEXT } from '../constants.ts';

interface LegalNoticeProps {
  onClose: () => void;
  isModal?: boolean;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ onClose, isModal = false }) => {
  return (
    <div className={`animate-in fade-in zoom-in-95 duration-500 bg-slate-900 border border-white/10 p-8 md:p-12 overflow-y-auto shadow-2xl relative ${isModal ? 'fixed inset-4 md:inset-10 z-[300] rounded-[2rem]' : 'rounded-[2.5rem] max-h-[85vh]'}`}>
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/5 rounded-2xl text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-90"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="space-y-10 text-slate-300 leading-relaxed font-medium">
        <header className="space-y-4 border-b border-white/5 pb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{LEGAL_TEXT.title}</h1>
          <p className="text-orange-400 font-black text-xs uppercase tracking-widest">{LEGAL_TEXT.version}</p>
          <p className="text-slate-500 text-sm font-bold">{LEGAL_TEXT.author}</p>
        </header>

        {LEGAL_TEXT.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">{section.heading}</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}

        <footer className="pt-12 text-center border-t border-white/5">
          <p className="text-xs text-slate-500 italic mb-4">
            "{LEGAL_TEXT.footer.split('.')[0]}"
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {LEGAL_TEXT.footer.split('-')[0]}
          </p>
          <button 
            onClick={onClose}
            className="mt-8 px-12 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-orange-400 hover:text-white transition-all shadow-xl active:scale-95"
          >
            ENTENDI E FECHAR
          </button>
        </footer>
      </div>
    </div>
  );
};
