
import React, { useState, useEffect } from 'react';

interface ScannerProps {
  onScanComplete: (amount: number) => void;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanComplete, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setScanning(false);
            setTimeout(() => onScanComplete(Math.floor(Math.random() * 500) + 50), 500);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scanning, onScanComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute top-8 right-8 z-[110]">
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Mock Camera View */}
      <div className="relative w-full max-w-sm aspect-[3/4] border-4 border-white/20 rounded-[3rem] overflow-hidden bg-slate-900 flex items-center justify-center">
        {/* Scanning Line */}
        <div 
          className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_#34d399] z-10 transition-all duration-100 ease-linear"
          style={{ top: `${progress}%` }}
        ></div>

        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse">📸</div>
          <p className="text-white/60 font-medium text-sm px-10">
            Aponte para o QR Code ou valor do produto...
          </p>
        </div>

        {/* Viewfinder Corners */}
        <div className="absolute top-10 left-10 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
        <div className="absolute top-10 right-10 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
      </div>

      <div className="mt-12 text-center space-y-4 max-w-xs">
        <h3 className="text-white font-bold text-xl">Scanner de Impulso</h3>
        <p className="text-white/40 text-xs">
          O Guardião está analisando o custo de oportunidade desta transação em tempo real.
        </p>
        
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
