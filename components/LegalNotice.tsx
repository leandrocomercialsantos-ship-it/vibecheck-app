
import React from 'react';

interface LegalNoticeProps {
  onClose: () => void;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ onClose }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 bg-slate-900 rounded-[2.5rem] border border-white/10 p-8 md:p-12 overflow-y-auto max-h-[85vh] shadow-2xl relative">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/5 rounded-2xl text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-90"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="space-y-12 text-slate-300 leading-relaxed font-medium">
        <header className="space-y-4 border-b border-white/5 pb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Aviso Legal e Termos de Uso</h1>
          <p className="text-orange-400 font-black text-xs uppercase tracking-widest">Última Atualização: Janeiro de 2025</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">1. Natureza da Plataforma</h2>
          <p>
            O <strong>Pelicano Invest</strong> é uma plataforma digital experimental, operando em versão BETA, desenvolvida por <strong>Leandro Dos Santos</strong>. Esta ferramenta foi concebida exclusivamente para fins de <strong>ENTRETENIMENTO, CONSCIENTIZAÇÃO e EDUCAÇÃO COMPORTAMENTAL</strong>.
          </p>
          <p>
            O objetivo primordial do projeto é oferecer um ambiente simulado para auxiliar indivíduos no combate a vícios em apostas e na melhoria da organização pessoal e financeira através da gamificação e inteligência artificial.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">2. Isenção Total de Responsabilidade Financeira</h2>
          <div className="p-6 bg-rose-500/10 border-l-4 border-rose-500 rounded-r-2xl">
            <p className="text-rose-200 font-bold uppercase text-xs tracking-widest mb-2">Atenção Crítica:</p>
            <p className="text-rose-100 italic">
              O Pelicano Invest, sua equipe, criadores ou mantenedores <strong>NÃO fornecem consultoria financeira real, gestão de ativos ou recomendações de investimento.</strong> Quaisquer dados, cálculos, sugestões de IA ou métricas apresentadas nesta plataforma são puramente ilustrativos e simulados.
            </p>
          </div>
          <p>
            Patrimônio é um assunto de extrema seriedade. O usuário declara estar ciente de que <strong>não deve basear nenhuma decisão financeira do mundo real, investimento, resgate ou gasto</strong> nos dados gerados por este site. O site não possui conexão direta com corretoras de valores ou instituições bancárias para fins de execução de ordens financeiras reais.
          </p>
          <p>
            O criador, Leandro Dos Santos, e qualquer entidade associada ao Pelicano Invest eximem-se de qualquer responsabilidade, direta ou indireta, por perdas financeiras, danos patrimoniais, decisões equivocadas ou quaisquer consequências advindas do manuseio do dinheiro real do usuário fora desta plataforma de simulação.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">3. Propriedade Intelectual e Uso do Nome</h2>
          <p>
            Todo o conteúdo, design, logotipia (incluindo o ícone do Pelicano moderno), algoritmos de gamificação e textos são de propriedade intelectual exclusiva do projeto Pelicano Invest e de seu criador. O uso não autorizado de qualquer elemento visual ou funcional é estritamente proibido.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">4. Privacidade e Segurança de Dados (Simulação)</h2>
          <p>
            Embora utilizemos tecnologias de ponta para garantir que sua experiência seja fluida, lembramos que este é um ambiente experimental. Dados sensíveis reais nunca devem ser inseridos em campos que não sejam estritamente necessários para a funcionalidade de entretenimento descrita. A "Conexão Bancária" via Open Finance descrita na interface é uma simulação para fins de experiência do usuário (UX) em sua fase atual.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">5. Combate ao Vício e Saúde Mental</h2>
          <p>
            O Pelicano Invest reconhece a gravidade da dependência em jogos de azar e apostas. Esta ferramenta visa ser um suporte psicológico e organizacional, mas <strong>não substitui tratamento médico ou terapêutico especializado.</strong> Se você ou alguém que você conhece sofre com ludopatia (vício em jogos), recomendamos buscar ajuda profissional imediata em órgãos de saúde competentes.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">6. Alterações nos Termos</h2>
          <p>
            O Pelicano Invest reserva-se o direito de alterar este Aviso Legal a qualquer momento, visando a segurança jurídica e a clareza para seus usuários. O uso continuado da plataforma após modificações implica na aceitação tácita dos novos termos.
          </p>
        </section>

        <section className="space-y-6 border-t border-white/5 pt-12">
          <h2 className="text-xl md:text-2xl font-bold text-white">7. Glossário de Responsabilidades</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Usuário:</strong> Responsável único por suas finanças reais e bem-estar.</li>
            <li><strong>Leandro Dos Santos:</strong> Criador e desenvolvedor, focado em impacto social e conscientização através de código.</li>
            <li><strong>IA Pelicano:</strong> Algoritmo de processamento de linguagem natural para fins didáticos e motivacionais.</li>
          </ul>
        </section>

        <footer className="pt-12 text-center border-t border-white/5">
          <p className="text-xs text-slate-500 italic">
            "Educação financeira é o caminho, mas a decisão final é sempre sua."
          </p>
          <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
            Pelicano Invest Pro © 2025 - Todos os direitos reservados.
          </p>
          <button 
            onClick={onClose}
            className="mt-8 px-12 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-orange-400 hover:text-white transition-all shadow-xl"
          >
            ENTENDI E CONCORDO
          </button>
        </footer>
      </div>
    </div>
  );
};
