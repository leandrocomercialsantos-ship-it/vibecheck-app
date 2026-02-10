
import React, { useState } from 'react';
import { UserProfile, Gamification } from '../types.ts';
import { PelicanLogo } from './PelicanLogo.tsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
  user: UserProfile;
  stats: Gamification;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, user, stats }) => {
  const menuItems = [
    { label: 'Visão Geral', icon: '📊', view: 'dashboard' },
    { label: 'Perfil Pelicano', icon: '👤', view: 'profile' },
    { label: 'Cofre de Sonhos', icon: '🎯', view: 'goals' },
    { label: 'Comunidade Elite', icon: '🌍', view: 'community' },
    { label: 'Relatórios Mensais', icon: '📈', view: 'report' },
    { label: 'Nível de Prosperidade', icon: '🏆', view: 'gamification' },
    { label: 'Termos e Isenção', icon: '⚖️', view: 'legal' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-slate-950 border-r border-white/5 shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-white/5">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <PelicanLogo className="w-32 h-32" />
          </div>
          
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-4 mb-4 text-left group relative z-10 w-full"
          >
            <div className="w-16 h-16 rounded-2xl border-2 border-orange-500/20 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold truncate max-w-[140px]">{user.name || 'Pelicano'}</h3>
              <p className="text-orange-400 text-xs truncate max-w-[140px] uppercase font-black tracking-widest">Elite Member</p>
            </div>
          </button>
          
          <div className="bg-white/5 rounded-xl p-3 space-y-2 relative z-10">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span>Nível {stats.level}</span>
              <span className="text-orange-400">{stats.xp}/{stats.nextLevelXp} XP</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-400 transition-all duration-500"
                style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.view) onNavigate(item.view);
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-8 border-t border-white/5 text-center space-y-2">
          <div className="flex justify-center mb-2">
            <PelicanLogo className="w-6 h-6 text-orange-400" />
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Pelicano Invest Pro v4.0</p>
          <p className="text-[10px] text-slate-600 italic font-medium">by Leandro Dos Santos</p>
        </div>
      </aside>
    </>
  );
};
