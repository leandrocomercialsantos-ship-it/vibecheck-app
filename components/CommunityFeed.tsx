
import React, { useState } from 'react';

const MOCK_POSTS = [
  { id: '1', text: 'Hoje eu disse não para uma aposta de R$ 50. Meu primeiro dia limpo graças à estratégia Pelicano! 🙏', reactions: 12, user: 'Elite Pelicano #402' },
  { id: '2', text: 'Consegui fechar o mês sem usar o cheque especial. O Pelicano Invest me salvou de 14 impulsos.', reactions: 45, user: 'Membro Elite #12' },
  { id: '3', text: 'Com o dinheiro que não gastei em skins, comprei meu presente de aniversário. Orgulho!', reactions: 28, user: 'Anônimo #89' },
  { id: '4', text: 'Bateu a vontade forte hoje, mas o SOS Pelicano me ajudou a respirar. Mais R$ 20 no cofre.', reactions: 56, user: 'Guardião #211' }
];

export const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const react = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, reactions: p.reactions + 1 } : p));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-20">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-slate-800">Comunidade Elite 🤝</h2>
        <p className="text-sm text-slate-500">Membros Pelicano Invest em jornada de sucesso.</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{post.user}</span>
              <span className="text-[10px] text-slate-300 font-medium">Agora mesmo</span>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed">{post.text}</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => react(post.id)}
                className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-100 transition-all active:scale-90"
              >
                <span>🔥</span>
                <span className="font-bold text-sm">{post.reactions}</span>
              </button>
              <button className="text-slate-300 p-2 hover:text-orange-400 transition-colors">
                <span>🙌</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-orange-50 p-6 rounded-[2.5rem] border-2 border-orange-100/50 text-center">
        <p className="text-orange-700 font-bold text-sm mb-4">Compartilhe sua vitória na elite Pelicano!</p>
        <button className="bg-orange-400 text-orange-950 font-black px-8 py-4 rounded-2xl shadow-lg hover:bg-orange-500 transition-all active:scale-95">
          Postar Conquista
        </button>
      </div>
    </div>
  );
};
