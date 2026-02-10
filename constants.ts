
import { Goal, OpportunityItem } from './types.ts';

export const OPPORTUNITY_ITEMS: OpportunityItem[] = [
  { name: 'Jantares Especiais', cost: 150, icon: '🍽️' },
  { name: 'Assinaturas de Streaming (Ano)', cost: 400, icon: '📺' },
  { name: 'Novo Smartphone', cost: 4500, icon: '📱' },
  { name: 'Viagem de Fim de Semana', cost: 1200, icon: '✈️' },
  { name: 'Curso de Especialização', cost: 2500, icon: '🎓' },
  { name: 'Reserva de Emergência (Mês)', cost: 2000, icon: '🛡️' }
];

export const INITIAL_GOALS: Goal[] = [];

export const SYSTEM_INSTRUCTION = `
Você é o Pelicano Invest, um assistente de inteligência financeira premium focado em proteger o patrimônio e os sonhos dos usuários. 

Sua voz e tom:
- Sophisticado e Elegante: Trate o usuário com exclusividade. 
- Guardião da Prosperidade: O pelicano é um símbolo de cuidado e resiliência. Você está aqui para garantir que o "ninho" (as economias) do usuário cresça.
- Empático e Educativo: Nunca julgue perdas. Se o usuário falhar, diga: 'Investir envolve aprendizado. Vamos recalibrar suas metas para garantir que seu futuro continue sólido.'
- Focado em 'Custo de Oportunidade': Sempre converta gastos impulsivos em conquistas futuras.

Suas Regras de Resposta:
1. Crise de Impulso: Use a paciência e a visão de longo prazo. O pelicano espera o momento certo para pescar; peça ao usuário que espere o momento certo para gastar.
2. Celebração de Vitórias: Celebre cada economia como um passo em direção à liberdade real.
3. Personalidade: Mantenha as respostas curtas, luxuosas e em Português do Brasil.

Assine mentalmente como Pelicano Invest. NUNCA incentive comportamentos de risco ou apostas.
`;

export const LEGAL_TEXT = {
  title: "Aviso Legal e Termos de Uso",
  version: "Versão Experimental BETA 4.0 - Janeiro 2025",
  author: "Projeto Independente Criado por Leandro Dos Santos",
  intro: "O Pelicano Invest é uma ferramenta experimental de inteligência comportamental financeira em estágio BETA. Ao acessar ou utilizar esta plataforma, você declara estar ciente e concordar com os termos abaixo descritos.",
  sections: [
    {
      heading: "1. Natureza da Plataforma",
      content: "O Pelicano Invest foi idealizado e desenvolvido exclusivamente por Leandro Dos Santos para fins de ENTRETENIMENTO, CONSCIENTIZAÇÃO e EDUCAÇÃO COMPORTAMENTAL. O projeto visa auxiliar na identificação de gatilhos emocionais que levam a gastos impulsivos e combater o vício em apostas através de mecanismos de gamificação e inteligência artificial."
    },
    {
      heading: "2. Isenção Total de Responsabilidade Financeira",
      content: "IMPORTANTE: O Pelicano Invest NÃO é uma corretora de valores, NÃO é uma instituição financeira regulamentada pelo Banco Central ou CVM, e NÃO fornece consultoria de investimentos real. Qualquer dado, gráfico, cálculo de retorno ou sugestão enviada pela IA Pelicano é meramente simulado, ilustrativo e educativo. Patrimônio é coisa séria: o usuário NÃO deve basear decisões financeiras reais, investimentos ou resgates patrimoniais nos dados gerados nesta plataforma. Leandro Dos Santos, a equipe ou eventuais mantenedores não se responsabilizam por quaisquer atos de investimento, manuseio de dinheiro ou perda de patrimônio por parte do usuário no mundo real."
    },
    {
      heading: "3. Caráter BETA e Experimental",
      content: "A plataforma opera em versão BETA. Funcionalidades, algoritmos e dados podem sofrer alterações drásticas ou remoção sem aviso prévio. O sistema de 'Conexão Bancária' e 'Scanner' são representações visuais destinadas a aprimorar a experiência de usuário (UX) em um ambiente controlado de simulação, sem movimentação real de ativos financeiros."
    },
    {
      heading: "4. Combate ao Vício e Saúde Mental",
      content: "A plataforma incentiva a proteção do capital através de reforços positivos. Contudo, o Pelicano Invest não substitui tratamento médico, terapêutico ou psiquiátrico especializado. Usuários com sinais de ludopatia (vício em jogo) são fortemente encorajados a buscar auxílio profissional em centros de saúde especializados."
    },
    {
      heading: "5. Direitos Autorais e Propriedade",
      content: "Toda a identidade visual, lógica de gamificação, o design do Pelicano moderno e o conteúdo textual são de propriedade intelectual exclusiva de Leandro Dos Santos. O uso da plataforma é gratuito para fins educativos e não implica em transferência de qualquer direito de propriedade sobre a ferramenta."
    },
    {
      heading: "6. Aceitação dos Termos",
      content: "Ao marcar a caixa de seleção no cadastro, o usuário declara ter lido este Aviso Legal na íntegra, compreendido seu caráter experimental e de entretenimento, e isenta o desenvolvedor de qualquer obrigação patrimonial ou cível."
    }
  ],
  footer: "Educação financeira é o caminho, mas a decisão final é sempre sua. Pelicano Invest Pro © 2025 - Wealth Guardianship - by Leandro Dos Santos."
};
