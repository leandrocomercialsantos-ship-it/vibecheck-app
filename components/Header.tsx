
import React from 'react';
import { useVibe } from '../context/VibeContext.tsx';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useVibe();

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
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            V
          </div>
          <h1 className="text-lg font-black text-white tracking-tighter">VibeCheck</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg">
          <div className="w-full h-full rounded-full border-2 border-slate-950 overflow-hidden">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
