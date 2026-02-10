
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
import { VibeProvider, useVibe } from './context/VibeContext.tsx';
import { speak } from './services/speech.ts';
import { Transaction, Goal, UserProfile, VoiceSettings, Gamification } from './types.ts';

type View = 'dashboard' | 'goals' | 'chat' | 'scanner' | 'profile' | 'settings-voice' | 'settings-guardian' | 'gamification' | 'report' | 'community';
type AppState = 'landing' | 'signup' | 'main';

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
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
    if (appState === 'main') {
      speak(`Olá ${user.name}! Sou o seu Guardião. Como está o seu equilíbrio financeiro hoje?`, voiceSettings);
    }
  }, [appState, user.name, voiceSettings]);

  const handlePanic = () => {
    speak("Ei, respira fundo. Antes de apostar, vamos conversar por 30 segundos?", voiceSettings);
    setActiveView('chat');
  };

  const handleScanComplete = (amount: number) => {
    const savingsItems = [
      { name: 'meses de Netflix', cost: 40 },
      { name: 'jantares especiais', cost: 120 },
      { name: 'viagens de Uber', cost: 25 }
    ];
    const item = savingsItems[Math.floor(Math.random() * savingsItems.length)];
    const equiv = (amount / item.cost).toFixed(1);
    
    speak(`Detectei uma tentativa de gasto de ${amount} reais. Sabia que isso equivale a cerca de ${equiv} ${item.name}?`, voiceSettings);
    
    if (confirm(`🚨 Análise do Guardião:\nR$ ${amount.toLocaleString('pt-BR')} detectados.\n\nIsso equivale a ${equiv} ${item.name}.\n\nDeseja evitar este gasto e colocar no Cofre de Sonhos?`)) {
      addTransaction(amount, 'saving', 'Impulso evitado via Scanner');
      setActiveView('goals');
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
        return (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 animate-in fade-in shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Seu Perfil</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img src={user.avatar} className="w-24 h-24 rounded-3xl border-4 border-slate-50 shadow-lg" alt="Profile" />
                <button className="text-indigo-600 font-bold hover:underline">Mudar Foto</button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Seu Nome</label>
                <input 
                  className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" 
                  value={user.name} 
                  onChange={e => setUser({...user, name: e.target.value})}
                />
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Open Finance 🔒</h3>
                <button 
                  onClick={() => setUser({...user, isBankConnected: !user.isBankConnected})}
                  className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${user.isBankConnected ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100' : 'bg-slate-900 text-white shadow-lg'}`}
                >
                  {user.isBankConnected ? (
                    <><span>✅</span> Banco Conectado</>
                  ) : (
                    <><span>🏦</span> Conectar via Open Finance</>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-widest font-bold">Alertas automáticos de depósitos em bets</p>
              </div>
            </div>
          </div>
        );
      case 'settings-voice':
        return (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 animate-in slide-in-from-bottom-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Personalidade do Guardião 🎙️</h2>
            <div className="space-y-8">
              <div className="flex gap-2">
                {(['friendly', 'firm', 'funny'] as const).map(p => (
                  <button 
                    key={p}
                    onClick={() => setVoiceSettings({...voiceSettings, personality: p})}
                    className={`flex-1 py-4 rounded-2xl font-bold capitalize transition-all ${voiceSettings.personality === p ? 'bg-indigo-600 text-white shadow-xl' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {p === 'friendly' ? 'Amigável' : p === 'firm' ? 'Firme' : 'Engraçado'}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Velocidade da Voz</label>
                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{voiceSettings.rate}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="2" step="0.1" 
                  className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={voiceSettings.rate}
                  onChange={e => setVoiceSettings({...voiceSettings, rate: parseFloat(e.target.value)})}
                />
              </div>
            </div>
          </div>
        );
      case 'settings-guardian':
        return (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 animate-in fade-in shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Modo Anjo da Guarda 👼</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">Em caso de crise severa ou impulsos recorrentes, vamos notificar automaticamente essa pessoa de confiança para te apoiar.</p>
            <div className="space-y-4">
              <input 
                placeholder="Email ou Telefone de confiança" 
                className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                value={user.guardianContact}
                onChange={e => setUser({...user, guardianContact: e.target.value})}
              />
              <button className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 active:scale-95 transition-all">Ativar Proteção</button>
            </div>
          </div>
        );
      case 'gamification':
        return (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="bg-indigo-950 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-4xl font-black italic mb-1">Rank: Ouro II</h2>
                   <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest">Próximo: Platina I</p>
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
             
             <h3 className="text-xl font-bold text-slate-800 px-2">Suas Conquistas 🎖️</h3>
             <div className="grid grid-cols-2 gap-4">
                {['Primeiro Dia', 'Resiliente', 'Economista Nato', 'Anti-Bet Master'].map(b => (
                  <div key={b} className={`p-5 rounded-[2rem] border-2 flex flex-col items-center gap-3 text-center transition-all ${gamification.badges.includes(b) ? 'bg-white border-emerald-100' : 'bg-slate-50 border-slate-100 opacity-40'}`}>
                    <span className="text-3xl">{gamification.badges.includes(b) ? '✅' : '🔒'}</span>
                    <span className="text-[10px] font-black text-slate-700 uppercase leading-tight">{b}</span>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return <Dashboard gamblingTotal={gamblingTotal} totalSaved={totalSaved} transactions={transactions} onPanic={handlePanic} onScan={() => setActiveView('scanner')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0 font-['Inter'] selection:bg-indigo-100">
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

        {activeView !== 'scanner' && (
          <QuickActions 
            onAddSaving={(amt) => addTransaction(amt, 'saving', 'Gasto evitado')}
            onAddLoss={(amt) => addTransaction(amt, 'gambling', 'Aposta efetuada')}
            onOpenCrisis={() => setActiveView('chat')}
          />
        )}
      </main>

      {/* Modern Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-40">
        <div className="glass rounded-[2rem] flex justify-around p-3 shadow-2xl border border-white/20">
          {[
            { icon: '📊', view: 'dashboard' as const, label: 'Início' },
            { icon: '🎯', view: 'goals' as const, label: 'Cofre' },
            { icon: '🛡️', view: 'chat' as const, label: 'Apoio' },
            { icon: '🌍', view: 'community' as const, label: 'Mundo' }
          ].map(item => (
            <button 
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeView === item.view ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <div className={`w-12 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${activeView === item.view ? 'bg-indigo-600 text-white shadow-lg' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
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
