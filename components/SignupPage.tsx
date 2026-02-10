
import React, { useState } from 'react';
import { usePelicano } from '../context/PelicanoContext.tsx';
import { LegalNotice } from './LegalNotice.tsx';

interface SignupPageProps {
  onComplete: () => void;
  onShowLegal: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onComplete }) => {
  const { setUser } = usePelicano();
  const [step, setStep] = useState<'form' | 'permissions'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [permissions, setPermissions] = useState({
    notifications: false,
    camera: false,
    usage: false,
  });

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 6 && name.trim() && acceptedTerms) {
      setStep('permissions');
    }
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinish = () => {
    setUser(prev => ({
      ...prev,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    }));
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in slide-in-from-right-8 duration-500 relative">
      {/* Modal de Aviso Legal com Z-Index 9999 e Scrollbox */}
      {showLegalModal && (
        <div className="fixed inset-0 z-[9998] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <LegalNotice onClose={() => setShowLegalModal(false)} isModal={true} />
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 space-y-8">
        {step === 'form' ? (
          <div className="animate-in fade-in duration-300">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
                Pelicano Invest: Comece a proteger seu capital agora!
              </h2>
              <p className="text-slate-500 text-center text-sm">Sua jornada para a prosperidade começa aqui.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome de Usuário</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como quer ser chamado?"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:border-orange-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:border-orange-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 caracteres"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:border-orange-500 outline-none transition-all"
                />
                <div className="flex gap-1 px-1 pt-1">
                  {[1, 2, 3].map((lvl) => (
                    <div key={lvl} className={`h-1 flex-1 rounded-full transition-all ${
                      getPasswordStrength() >= lvl ? 'bg-orange-500' : 'bg-slate-200'
                    }`}></div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Confirmar Senha</label>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita sua senha"
                  className={`w-full bg-slate-50 border-2 rounded-2xl px-4 py-3 text-slate-800 outline-none transition-all ${
                    confirmPassword && password !== confirmPassword ? 'border-red-300' : 'border-slate-100 focus:border-orange-500'
                  }`}
                />
              </div>

              {/* Trava de Cadastro: Aviso Legal - Gatilho Modal */}
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100 mt-4">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-orange-900 leading-relaxed cursor-pointer select-none">
                  Estou ciente de que o Pelicano Invest é uma ferramenta experimental de entretenimento e concordo com os <button type="button" onClick={() => setShowLegalModal(true)} className="underline font-bold text-orange-600 hover:text-orange-800 transition-colors">Aviso Legal e Termos de Uso</button>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={!acceptedTerms || password !== confirmPassword || password.length < 6}
                className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all active:scale-95 ${
                  acceptedTerms && password === confirmPassword && password.length >= 6
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Cadastrar
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <div className="space-y-4 mb-8 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mx-auto">🛡️</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Proteção Pelicano Ativada
              </h2>
              <p className="text-slate-500 text-sm">
                Para o Pelicano Invest te proteger de verdade, precisamos da sua permissão para monitorar suas transações e entender seus padrões.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'notifications', title: 'Acesso a Notificações', desc: 'Detectar transações instantaneamente.', icon: '🔔' },
                { key: 'camera', title: 'Acesso à Câmera', desc: 'Scanner de Impulso Pelicano para compras.', icon: '📸' },
                { key: 'usage', title: 'Dados de Uso', desc: 'Reconhecer gatilhos e padrões de sucesso.', icon: '📊' }
              ].map((perm) => (
                <button 
                  key={perm.key}
                  onClick={() => togglePermission(perm.key as any)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left active:scale-[0.98] ${
                    permissions[perm.key as keyof typeof permissions] 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-2xl">{perm.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{perm.title}</p>
                    <p className="text-xs text-slate-500">{perm.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    permissions[perm.key as keyof typeof permissions] ? 'bg-orange-500 border-orange-500' : 'border-slate-300'
                  }`}>
                    {permissions[perm.key as keyof typeof permissions] && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handleFinish}
              className="w-full mt-10 py-4 bg-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
            >
              Concluir Cadastro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
