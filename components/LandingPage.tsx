
import React from 'react';
import { PelicanLogo } from './PelicanLogo.tsx';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500/30">
      {/* Sophisticated Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12 relative">
        {/* Logo Section - Centered at the Top of Hero */}
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="w-28 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] flex items-center justify-center text-white border border-white/10 shadow-[0_0_50px_rgba(251,146,60,0.15)] hover:scale-105 transition-transform cursor-default">
            <PelicanLogo className="w-16 h-16 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter text-white">Pelicano Invest</h2>
            <p className="text-orange-400 font-bold text-xs uppercase tracking-[0.3em]">Wealth Protection</p>
          </div>
          
          {/* Main Action Button - Immediately below logo */}
          <button 
            onClick={onStart}
            className="mt-4 px-10 py-4 bg-white text-slate-950 font-black text-sm rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-orange-50 hover:shadow-[0_10px_40px_rgba(251,146,60,0.2)] transition-all active:scale-95 uppercase tracking-widest border border-white/20"
          >
            INICIAR JORNADA
          </button>
        </div>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-6 animate-in fade-in duration-1000 delay-300">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Proteja seu ninho com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Inteligência Real
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            O assistente premium de gestão comportamental que transforma impulsos em patrimônio sólido.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest">Descubra mais</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 bg-slate-900/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.4em]">Pelicano Elite</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Prosperidade por Design</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: '🦅', 
                title: 'Vigilância Ativa',
                text: 'IA avançada monitorando gatilhos emocionais e financeiros para proteger seu capital.',
                color: 'bg-orange-500/10 text-orange-400'
              },
              { 
                icon: '💎', 
                title: 'Cofre de Sonhos',
                text: 'Gestão dinâmica de objetivos reais com gratificação imediata por economizar.',
                color: 'bg-amber-500/10 text-amber-400'
              }
            ].map((benefit, i) => (
              <div key={i} className="group p-8 bg-slate-800/40 rounded-[2.5rem] border border-white/5 hover:border-orange-500/30 transition-all hover:bg-slate-800/60 shadow-xl">
                <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center bg-slate-950 space-y-4">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
          Pelicano Invest &copy; 2024 - Wealth Guardianship
        </p>
        <p className="text-slate-500 text-xs italic font-medium opacity-60">
          by Leandro Dos Santos
        </p>
      </footer>
    </div>
  );
};
