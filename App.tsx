
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { CrisisChat } from './components/CrisisChat.tsx';
import { GoalsSystem } from './components/GoalsSystem.tsx';
import { QuickActions } from './components/QuickActions.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { SignupPage } from './components/SignupPage.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Scanner } from './components/Scanner.tsx';
import { RealityReport } from './components/RealityReport.tsx';
import { CommunityFeed } from './components/CommunityFeed.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { VibeProvider, useVibe } from './context/VibeContext.tsx';
import { speak } from './services/speech.ts';
import { Transaction, Goal, UserProfile, VoiceSettings, Gamification } from './types.ts';

type View = 'dashboard' | 'goals' | 'chat' | 'scanner' | 'profile' | 'settings-voice' | 'settings-guardian' | 'gamification' | 'report' | 'community';
type AppState = 'landing' | 'signup' | 'main';

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('vibecheck_user_data');
    return (saved && JSON.parse(saved).name) ? 'main' : 'landing';
  });
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { 
    user, setUser, 
    transactions, addTransaction, 
    goals, 
    voiceSettings, setVoiceSettings, 
    gamification 
  } = useVibe();

  useEffect(() => {
    if (appState === 'main' && user.name) {
      speak(`Olá ${user.name}! Sou o seu Guardião. Como está o seu equilíbrio financeiro hoje?`, voiceSettings);
    }
  }, [appState]);

  const handlePanic = () => {
    speak("Ei, respira fundo. Antes de apostar, vamos conversar por 30 segundos?", voiceSettings);
    setActiveView('chat');
  };

  const handleScanComplete = (amount: number, label: string) => {
    const percentageOfBudget = ((amount / user.monthlyBudget) * 100).toFixed(1);
    const investmentReturn = (amount * 1.1).toLocaleString('pt-BR');

    const message = `${user.name}, esse ${label} custa R$ ${amount.toLocaleString('pt-BR')}. Isso representa ${percentageOfBudget}% do seu orçamento mensal. Se você investir esse valor, em 1 ano ele poderia valer mais de R$ ${investmentReturn}. Quer mesmo continuar com essa compra ou prefere proteger seu futuro?`;

    speak(message, voiceSettings);
    
    if (confirm(`🤖 ANÁLISE DO GUARDIÃO\n\n${message}\n\nPresione OK para DESISTIR e POUPAR.\nPresione CANCELAR para comprar assim mesmo.`)) {
      addTransaction(amount, 'saving', `Economia: Desistiu de comprar ${label}`);
      alert("Boa escolha! Esse valor foi adicionado ao seu progresso de metas. 🛡️✨");
      setActiveView('goals');
    } else {
      addTransaction(amount, 'impulse', `Gasto por impulso: ${label}`);
      alert("Entendido. Registramos o gasto, mas lembre-se do seu objetivo maior.");
      setActiveView('dashboard');
    }
    setActiveView('dashboard');
  };

  const gamblingTotal = transactions
    .filter(t => t.type === 'gambling')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSaved = transactions
    .filter(t => t.type === 'saving')
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (appState === 'landing') return <LandingPage onStart={() => setAppState('signup')} />;
  if (appState === 'signup') return <SignupPage onComplete={() => setAppState('main')} />;

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard 
          gamblingTotal={gamblingTotal} 
          totalSaved={totalSaved} 
          transactions={transactions} 
          onPanic={handlePanic}
          onScan={() => setActiveView('scanner')}
        />;
      case 'goals':
        return <GoalsSystem goals={goals} totalSaved={totalSaved} />;
      case 'chat':
        return <CrisisChat voiceSettings={voiceSettings} />;
      case 'report':
        return <RealityReport />;
      case 'community':
        return <CommunityFeed />;
      case 'scanner':
        return <Scanner onScanComplete={handleScanComplete} onClose={() => setActiveView('dashboard')} />;
      case 'profile':
        return <ProfileView />;
      case 'settings-voice':
        return (
          <div className="glass-premium p-8 rounded-[2.5rem] animate-in slide-in-from-bottom-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">Personalidade do Guardião 🎙️</h2>
            <div className="space-y-8">
              <div className="flex gap-2">
                {(['friendly', 'firm', 'funny'] as const).map(p => (
                  <button 
                    key={p}
                    onClick={() => setVoiceSettings({...voiceSettings, personality: p})}
                    className={`flex-1 py-4 rounded-2xl font-bold capitalize transition-all ${voiceSettings.personality === p ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                  >
                    {p === 'friendly' ? 'Amigável' : p === 'firm' ? 'Firme' : 'Engraçado'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'gamification':
        return (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="glass-premium text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-4xl font-black italic mb-1">Nível {gamification.level}</h2>
                   <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest">Guardião da Paz</p>
                 </div>
                 <span className="text-6xl animate-bounce">🏆</span>
               </div>
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                   <span>Resiliência Financeira</span>
                   <span>{gamification.xp} / {gamification.nextLevelXp} XP</span>
                 </div>
                 <div className="h-5 bg-white/10 rounded-full overflow-hidden p-1">
                    <div 
                      className="h-full bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-all duration-1000"
                      style={{ width: `${(gamification.xp / gamification.nextLevelXp) * 100}%` }}
                    ></div>
                 </div>
               </div>
             </div>
          </div>
        );
      default:
        return <Dashboard gamblingTotal={gamblingTotal} totalSaved={totalSaved} transactions={transactions} onPanic={handlePanic} onScan={() => setActiveView('scanner')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0 font-['Inter'] selection:bg-indigo-500/30">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={(view) => { setActiveView(view); setIsSidebarOpen(false); }}
        user={user}
        stats={gamification}
      />

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-8 space-y-8 pb-20">
        {renderView()}

        {activeView !== 'scanner' && activeView !== 'profile' && activeView !== 'dashboard' && (
          <QuickActions 
            onAddSaving={(amt) => addTransaction(amt, 'saving', 'Gasto evitado')}
            onAddLoss={(amt) => addTransaction(amt, 'gambling', 'Aposta efetuada')}
            onOpenCrisis={() => setActiveView('chat')}
          />
        )}
      </main>

      {/* Navigation Inferior Premium */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none">
        <div className="glass-premium rounded-[2.5rem] flex justify-around p-4 shadow-2xl border border-white/10 pointer-events-auto max-w-md mx-auto">
          {[
            { icon: '🏠', view: 'dashboard' as const, label: 'Início' },
            { icon: '🎯', view: 'goals' as const, label: 'Cofre' },
            { icon: '🛡️', view: 'chat' as const, label: 'Apoio' },
            { icon: '👤', view: 'profile' as const, label: 'Perfil' }
          ].map(item => (
            <button 
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-500 ${activeView === item.view ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              <div className={`w-12 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${activeView === item.view ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${activeView === item.view ? 'text-indigo-400' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const App: React.FC = () => (
  <VibeProvider>
    <AppContent />
  </VibeProvider>
);

export default App;
