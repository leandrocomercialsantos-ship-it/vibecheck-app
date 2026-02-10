
export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
}

export type TransactionCategory = 'Alimentação' | 'Lazer' | 'Transporte' | 'Saúde' | 'Educação' | 'Investimento' | 'Outros';

export interface Transaction {
  id: string;
  amount: number;
  type: 'gambling' | 'impulse' | 'saving';
  description: string;
  category: TransactionCategory;
  date: string;
}

export interface OpportunityItem {
  name: string;
  cost: number;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  vibe: string;
  guardianContact: string;
  isBankConnected: boolean;
  monthlyBudget: number;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  personality: 'friendly' | 'firm' | 'funny';
}

export interface Gamification {
  level: number;
  xp: number;
  nextLevelXp: number;
  badges: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  text: string;
  reactions: number;
  timestamp: string;
}
