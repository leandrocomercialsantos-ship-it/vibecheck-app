
import React from 'react';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { PelicanLogo } from './PelicanLogo.tsx';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50 bg-slate-950/20 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all active:scale-95 border border-white/5 shadow-xl"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <PelicanLogo className="w-8 h-8 text-white" />
          <h1 className="text-lg font-black text-white tracking-tighter">Pelicano Invest</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Espaço reservado para manter o alinhamento ou futuras ações */}
        <div className="w-10"></div>
      </div>
    </header>
  );
};
