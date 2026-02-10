
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

type View = 'dashboard' | 'goals' | 'chat' | 'scanner' | 'profile' | 'settings-voice' | 'gamification' | 'report' | 'community';
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
      speak(`Olá ${user.name}! Bem-vindo ao Pelicano Invest. Vamos proteger seu patrimônio hoje?`, voiceSettings);
    }
  }, [appState]);

  const handlePanic = () => {
    speak("A calma é a melhor estratégia do Pelicano. Vamos analisar suas opções antes de qualquer gasto?", voiceSettings);
    setActiveView('chat');
  };

  const handleScanComplete = (amount: number, label: string) => {
    const percentageOfBudget = ((amount / user.monthlyBudget) * 100).toFixed(1);
    const investmentReturn = (amount * 1.15).toLocaleString('pt-BR');

    const message = `${user.name}, o Pelicano Invest analisou este ${label}. O custo é de R$ ${amount.toLocaleString('pt-BR')}, ou ${percentageOfBudget}% do seu capital mensal. Este valor reinvestido hoje poderia render R$ ${investmentReturn} em breve. Deseja manter este valor no seu ninho?`;

    speak(message, voiceSettings);
    
    if (confirm(`🦅 ANÁLISE PELICANO\n\n${message}\n\nPresione OK para PROTEGER e POUPAR.\nPresione CANCELAR para prosseguir com o gasto.`)) {
      addTransaction(amount, 'saving', `Proteção Pelicano: Poupou ao não comprar ${label}`);
      alert("Decisão sábia. O Pelicano Invest registrou sua economia. 🛡️✨");
      setActiveView('goals');
    } else {
      addTransaction(amount, 'impulse', `Gasto registrado: ${label}`);
      alert("Registro efetuado. O Pelicano continuará vigiando para sua próxima oportunidade.");
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
        return <GoalsSystem />;
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
      case 'gamification':
        return (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="glass-premium text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-orange-500/20">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-4xl font-black italic mb-1">Elite Nível {gamification.level}</h2>
                   <p className="text-orange-300 font-bold text-xs uppercase tracking-widest">Resiliência Pelicano</p>
                 </div>
                 <span className="text-6xl animate-bounce">🦅</span>
               </div>
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                   <span>Progresso de Prosperidade</span>
                   <span>{gamification.xp} / {gamification.nextLevelXp} XP</span>
                 </div>
                 <div className="h-5 bg-white/10 rounded-full overflow-hidden p-1">
                    <div 
                      className="h-full bg-orange-400 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.5)] transition-all duration-1000"
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
    <div className="min-h-screen flex flex-col pb-24 md:pb-0 font-['Inter'] selection:bg-orange-500/30">
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
            onAddSaving={(amt) => addTransaction(amt, 'saving', 'Economia registrada')}
            onAddLoss={(amt) => addTransaction(amt, 'gambling', 'Gasto/Aposta registrada')}
            onOpenCrisis={() => setActiveView('chat')}
          />
        )}
      </main>

      {/* Navigation Inferior Pelicano */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none">
        <div className="glass-premium rounded-[2.5rem] flex justify-around p-4 shadow-2xl border border-white/10 pointer-events-auto max-w-md mx-auto">
          {[
            { icon: '🏠', view: 'dashboard' as const, label: 'Início' },
            { icon: '🎯', view: 'goals' as const, label: 'Cofre' },
            { icon: '🦅', view: 'chat' as const, label: 'Estratégia' },
            { icon: '👤', view: 'profile' as const, label: 'Perfil' }
          ].map(item => (
            <button 
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-500 ${activeView === item.view ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              <div className={`w-12 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${activeView === item.view ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(251,146,60,0.5)]' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${activeView === item.view ? 'text-orange-400' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Footer Fixo */}
      <div className="fixed bottom-2 left-0 right-0 text-center pointer-events-none pb-1">
        <p className="text-[8px] text-slate-700 italic font-medium tracking-widest opacity-50">
          by Leandro Dos Santos
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <VibeProvider>
    <AppContent />
  </VibeProvider>
);

export default App;
