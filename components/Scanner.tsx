
import React, { useState, useEffect, useRef } from 'react';

interface ScannerProps {
  onScanComplete: (amount: number, label: string) => void;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanComplete, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setScanning(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setAnalyzing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        const randomAmount = Math.floor(Math.random() * 800) + 100;
        const labels = ["Tênis Esportivo", "Smartphone Novo", "Jantar Luxuoso", "Relógio de Grife"];
        const label = labels[Math.floor(Math.random() * labels.length)];
        onScanComplete(randomAmount, label);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="absolute top-8 right-8 z-[110]">
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {error ? (
        <div className="text-white text-center p-10 space-y-4">
          <p className="text-xl font-bold">⚠️ {error}</p>
          <button onClick={onClose} className="bg-white/20 px-6 py-2 rounded-xl">Voltar</button>
        </div>
      ) : (
        <div className="relative w-full max-w-sm aspect-[3/4] border-4 border-white/20 rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Grid */}
          <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40"></div>
          
          {/* Scanning Line */}
          {scanning && !analyzing && (
            <div className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_#34d399] z-10 animate-[scan_2s_linear_infinite]"></div>
          )}

          {analyzing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="space-y-2">
                <h3 className="text-emerald-400 font-black text-2xl">ANALISANDO...</h3>
                <p className="text-white/60 text-sm">Calculando custo de oportunidade e impacto no seu sonho...</p>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Viewfinder Corners */}
          <div className="absolute top-12 left-12 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg opacity-60"></div>
          <div className="absolute top-12 right-12 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg opacity-60"></div>
          <div className="absolute bottom-12 left-12 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg opacity-60"></div>
          <div className="absolute bottom-12 right-12 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg opacity-60"></div>
        </div>
      )}

      {!analyzing && !error && (
        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full p-2 shadow-2xl active:scale-90 transition-transform"
          >
            <div className="w-full h-full border-4 border-slate-900 rounded-full"></div>
          </button>
          <div className="text-center space-y-1">
            <h3 className="text-white font-bold text-xl">Scanner de Impulso</h3>
            <p className="text-white/40 text-xs">Aponte para o produto e capture para análise.</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
};
