
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
  author: "Desenvolvido por Leandro Dos Santos",
  sections: [
    {
      heading: "1. Natureza da Plataforma e Declaração BETA",
      content: "O Pelicano Invest é uma plataforma digital experimental em estágio BETA. O projeto foi idealizado e desenvolvido de forma independente por Leandro Dos Santos exclusivamente para fins de ENTRETENIMENTO, CONSCIENTIZAÇÃO e EDUCAÇÃO COMPORTAMENTAL. Não se trata de uma ferramenta financeira comercial ou regulamentada."
    },
    {
      heading: "2. Isenção de Responsabilidade sobre Patrimônio Real",
      content: "O Pelicano Invest, sua equipe, criadores ou mantenedores NÃO fornecem consultoria financeira, corretagem de valores ou gestão de investimentos real. Qualquer dado, cálculo ou sugestão de IA apresentada é puramente simulada e educativa. O usuário NÃO deve basear decisões financeiras do mundo real, investimentos ou movimentações patrimoniais nos dados desta plataforma. Patrimônio é coisa séria: consulte sempre profissionais certificados e instituições financeiras regulamentadas antes de qualquer ação real."
    },
    {
      heading: "3. Foco Social: Combate ao Vício em Apostas",
      content: "Este projeto nasceu com a missão social de auxiliar na identificação de gatilhos emocionais e combater vícios em apostas e gastos impulsivos através da gamificação. O objetivo é ajudar na organização pessoal e na percepção do custo de oportunidade. Entretanto, esta ferramenta não substitui ajuda médica, psicológica ou psiquiátrica especializada. Se você enfrenta problemas com jogos de azar, procure auxílio profissional imediatamente."
    },
    {
      heading: "4. Limitação de Responsabilidade Civil",
      content: "O criador, Leandro Dos Santos, exime-se de qualquer responsabilidade direta ou indireta por atos de investimento, manuseio de dinheiro ou perda de patrimônio por parte do usuário. Ao utilizar esta simulação, o usuário assume total e exclusiva responsabilidade por suas finanças reais fora deste ambiente de entretenimento."
    },
    {
      heading: "5. Privacidade e Experiência do Usuário (UX)",
      content: "Funcionalidades como 'Conexão Bancária' e 'Scanner de Impulso' são representações visuais destinadas a aprimorar a experiência de aprendizado (User Experience). Dados sensíveis bancários não são movimentados e não há conexão real com sistemas de execução financeira de terceiros nesta versão experimental."
    },
    {
      heading: "6. Direitos e Propriedade",
      content: "Toda a identidade visual, lógica de gamificação e textos são de propriedade intelectual de Leandro Dos Santos. O uso da plataforma implica na aceitação plena destes termos de isenção."
    }
  ],
  footer: "Educação financeira é o caminho, mas a decisão final é sempre sua. Pelicano Invest Pro © 2025 - Wealth Guardianship."
};
