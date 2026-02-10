
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30">
      {/* Sophisticated Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12 relative">
        {/* Logo Section - Centered at the Top of Hero */}
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] flex items-center justify-center text-white font-bold text-5xl shadow-[0_0_50px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform cursor-default">
            V
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter text-white">VibeCheck</h2>
            <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">Finance Elite</p>
          </div>
          
          {/* Main Action Button - Immediately below logo */}
          <button 
            onClick={onStart}
            className="mt-4 px-10 py-4 bg-white text-slate-950 font-black text-sm rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-indigo-50 hover:shadow-[0_10px_40px_rgba(79,70,229,0.2)] transition-all active:scale-95 uppercase tracking-widest border border-white/20"
          >
            REGISTRO OU LOGIN
          </button>
        </div>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-6 animate-in fade-in duration-1000 delay-300">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Assuma o controle da sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
              Liberdade Real
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            O primeiro assistente comportamental que protege seu patrimônio de impulsos e vícios invisíveis.
          </p>
        </div>

        {/* Visual Element */}
        <div className="relative w-full max-w-lg animate-in zoom-in-95 fade-in duration-1000 delay-500">
          <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-2xl flex gap-6 items-center mx-auto max-w-sm">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
              🛡️
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Status do Guardião</p>
              <p className="text-2xl font-bold text-white tracking-tight">Vigilância Ativa</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest">Saiba Mais</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Benefits Section - Only visible on scroll */}
      <section className="py-32 px-6 bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em]">Tecnologia VibeCheck</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Por que somos diferentes?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: '🔍', 
                title: 'Detecção Comportamental',
                text: 'Nossa IA identifica padrões de micro-gastos e comportamentos impulsivos antes mesmo de você perceber.',
                color: 'bg-indigo-500/10 text-indigo-400'
              },
              { 
                icon: '🎯', 
                title: 'Metas de Recompensa',
                text: 'Transformamos cada centavo economizado em progresso real para os objetivos que você realmente deseja.',
                color: 'bg-violet-500/10 text-violet-400'
              },
              { 
                icon: '🛡️', 
                title: 'Proteção Anti-Apostas',
                text: 'Apoio psicológico e técnico imediato em momentos de fissura contra o vício em apostas online.',
                color: 'bg-rose-500/10 text-rose-400'
              },
              { 
                icon: '💬', 
                title: 'Diálogo Inteligente',
                text: 'Uma interface que fala a sua língua e oferece empatia real, sem julgamentos ou tecnicismos.',
                color: 'bg-teal-500/10 text-teal-400'
              }
            ].map((benefit, i) => (
              <div key={i} className="group p-8 bg-slate-800/40 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-slate-800/60 shadow-xl">
                <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="pt-12 text-center">
            <button 
              onClick={onStart}
              className="px-12 py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95"
            >
              Criar Minha Conta Grátis
            </button>
            <p className="mt-6 text-slate-500 text-sm font-medium">Junte-se a milhares de pessoas que retomaram o controle.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center bg-slate-950">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
          VibeCheck Finance &copy; 2024 - Elite Protection
        </p>
      </footer>
    </div>
  );
};
