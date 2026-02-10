
import React, { useState } from 'react';

interface SignupPageProps {
  onComplete: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'form' | 'permissions'>('form');
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
    if (password === confirmPassword && password.length >= 6) {
      setStep('permissions');
    }
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in slide-in-from-right-8 duration-500">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 space-y-8">
        {step === 'form' ? (
          <div className="animate-in fade-in duration-300">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
                Crie sua conta e comece a mudar sua vida!
              </h2>
              <p className="text-slate-500 text-center text-sm">Sua jornada para o equilíbrio começa aqui.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:border-indigo-500 outline-none transition-all"
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
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:border-indigo-500 outline-none transition-all"
                />
                <div className="flex gap-1 px-1 pt-1">
                  {[1, 2, 3].map((lvl) => (
                    <div key={lvl} className={`h-1 flex-1 rounded-full transition-all ${
                      getPasswordStrength() >= lvl ? 'bg-indigo-500' : 'bg-slate-200'
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
                    confirmPassword && password !== confirmPassword ? 'border-red-300' : 'border-slate-100 focus:border-indigo-500'
                  }`}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Cadastrar
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-medium">Ou entre com</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"/></svg>
                Apple
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <div className="space-y-4 mb-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto">🛡️</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Proteção Ativada
              </h2>
              <p className="text-slate-500 text-sm">
                Para o VibeCheck te proteger de verdade, precisamos da sua permissão para monitorar suas transações e entender seus padrões.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'notifications', title: 'Acesso a Notificações', desc: 'Detectar transações instantaneamente.', icon: '🔔' },
                { key: 'camera', title: 'Acesso à Câmera', desc: 'Scanner de Impulso para compras físicas.', icon: '📸' },
                { key: 'usage', title: 'Dados de Uso', desc: 'Reconhecer gatilhos e padrões de humor.', icon: '📊' }
              ].map((perm) => (
                <button 
                  key={perm.key}
                  onClick={() => togglePermission(perm.key as any)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left ${
                    permissions[perm.key as keyof typeof permissions] 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{perm.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{perm.title}</p>
                    <p className="text-xs text-slate-500">{perm.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    permissions[perm.key as keyof typeof permissions] ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'
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
              onClick={onComplete}
              className="w-full mt-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Concluir Cadastro
            </button>
            <button 
              onClick={() => setStep('form')}
              className="w-full mt-2 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Voltar para os dados
            </button>
          </div>
        )}
      </div>
      <p className="mt-8 text-xs text-slate-400 font-medium max-w-[250px] text-center">
        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
      </p>
    </div>
  );
};
