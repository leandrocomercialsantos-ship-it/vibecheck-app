
import React, { useState } from 'react';
import { UserProfile, Gamification } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
  user: UserProfile;
  stats: Gamification;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, user, stats }) => {
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    { label: 'Início', icon: '📊', view: 'dashboard' },
    { label: 'Cofre de Sonhos', icon: '🎯', view: 'goals' },
    { label: 'Comunidade Guardiã', icon: '🌍', view: 'community' },
    { label: 'Relatório de Realidade', icon: '📈', view: 'report' },
    { label: 'Scanner de Impulso', icon: '📸', view: 'scanner' },
    { label: 'Nível de Guardião', icon: '🏆', view: 'gamification' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 bg-indigo-700 text-white relative overflow-hidden">
          {/* Logo element from prompt description (Shield -> Growth) */}
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
          </div>
          
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-4 mb-4 text-left group relative z-10"
          >
            <div className="w-16 h-16 rounded-2xl border-2 border-white/20 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-indigo-200 text-xs">{user.vibe}</p>
            </div>
          </button>
          
          <div className="bg-black/10 rounded-xl p-3 space-y-2 relative z-10">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium">Nível {stats.level}</span>
              <span className="font-bold text-emerald-400">{stats.xp}/{stats.nextLevelXp} XP</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.view) onNavigate(item.view);
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-indigo-50 transition-colors font-medium group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl group-hover:rotate-45 transition-transform">⚙️</span>
                  <span className="text-sm text-indigo-900 font-bold">Configurações</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${showSettings ? 'max-h-80 mt-1 bg-slate-50 rounded-2xl p-1' : 'max-h-0'}`}>
                {[
                  { label: 'Voz da IA', icon: '🎙️', view: 'settings-voice' },
                  { label: 'Anjo da Guarda', icon: '👼', view: 'settings-guardian' },
                  { label: 'Conectar Banco', icon: '🏦', view: 'profile' },
                  { label: 'Notificações', icon: '🔔' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { if(item.view) onNavigate(item.view); onClose(); }}
                    className="w-full flex items-center gap-4 px-8 py-3 text-slate-600 hover:text-indigo-600 transition-colors text-xs font-semibold"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 px-4 border-t border-slate-100 pt-4">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-medium">
              <span className="text-xl">🚪</span>
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VibeCheck Finance v3.0</p>
        </div>
      </aside>
    </>
  );
};
