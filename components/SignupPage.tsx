
import React, { useState } from 'react';
import { useVibe } from '../context/VibeContext.tsx';

interface SignupPageProps {
  onComplete: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onComplete }) => {
  const { setUser } = useVibe();
  const [step, setStep] = useState<'form' | 'permissions'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password === confirmPassword && password.length >= 6 && name.trim()) {
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in slide-in-from-right-8 duration-500">
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

              <button 
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg shadow-slate-100 hover:bg-slate-800 transition-all active:scale-95"
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
              className="w-full mt-10 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
            >
              Concluir Cadastro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
