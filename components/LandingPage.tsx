
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      {/* Background blobs for aesthetic appeal */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[100px] opacity-60"></div>
      </div>

      <div className="max-w-xl w-full text-center space-y-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-indigo-200 animate-bounce [animation-duration:3s]">
            V
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">VibeCheck Finance</h2>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Seu Guardião <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Financeiro Inteligente
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            Pare de perder dinheiro em micro-gastos e impulsos. Reconquiste sua paz financeira com apoio real.
          </p>
        </div>

        {/* Abstract Illustration Placeholder */}
        <div className="relative h-48 w-full flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64">
              <path fill="#4F46E5" d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5C87.5,14.1,81.7,28.2,73.4,40.8C65.1,53.4,54.3,64.5,41.4,72.2C28.5,79.8,14.2,84.1,-0.6,85.1C-15.4,86.2,-30.7,84.1,-44.2,77C-57.6,69.9,-69.1,57.9,-77.1,44.1C-85.1,30.3,-89.6,14.7,-88.7,0.5C-87.8,-13.7,-81.4,-26.5,-73.1,-37.9C-64.8,-49.3,-54.6,-59.4,-42.6,-67.4C-30.6,-75.4,-15.3,-81.4,0.3,-82C15.9,-82.5,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="z-10 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl flex gap-4 items-center">
            <div className="text-4xl">🌱</div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saldo de Liberdade</p>
              <p className="text-2xl font-bold text-slate-800">Crescendo...</p>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {[
            { icon: '🔍', text: 'Detecta gastos invisíveis e impulsivos.' },
            { icon: '🎯', text: 'Transforma impulsos em conquistas reais.' },
            { icon: '🛡️', text: 'Apoio especializado contra apostas.' },
            { icon: '💬', text: 'IA empática que entende você.' }
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xl">{benefit.icon}</span>
              <p className="text-sm font-medium text-slate-700 leading-tight">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button 
            onClick={onStart}
            className="w-full py-4 px-8 bg-indigo-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 group"
          >
            Começar Agora
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
          <p className="mt-4 text-xs text-slate-400 font-medium">
            100% gratuito. Seu bem-estar é nossa prioridade.
          </p>
        </div>
      </div>
    </div>
  );
};
