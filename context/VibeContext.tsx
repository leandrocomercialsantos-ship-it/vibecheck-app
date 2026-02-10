
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Transaction, Goal, VoiceSettings, Gamification } from '../types.ts';
import { INITIAL_GOALS } from '../constants.ts';

interface VibeContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  transactions: Transaction[];
  addTransaction: (amount: number, type: Transaction['type'], description: string) => void;
  goals: Goal[];
  voiceSettings: VoiceSettings;
  setVoiceSettings: (settings: VoiceSettings) => void;
  gamification: Gamification;
  setGamification: React.Dispatch<React.SetStateAction<Gamification>>;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

export const VibeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Silva',
    avatar: 'https://picsum.photos/seed/vibecheck/100/100',
    vibe: 'Em busca de equilíbrio 🌿',
    guardianContact: '',
    isBankConnected: false,
  });

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    personality: 'friendly',
  });

  const [gamification, setGamification] = useState<Gamification>({
    level: 3,
    xp: 450,
    nextLevelXp: 1000,
    badges: ['Primeiro Dia', 'Resiliente'],
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  const addTransaction = (amount: number, type: Transaction['type'], description: string) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      type,
      description,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);

    if (type === 'saving') {
      setGoals(prevGoals => prevGoals.map(goal => ({
        ...goal,
        currentAmount: goal.currentAmount + (amount / prevGoals.length)
      })));
      setGamification(prev => ({
        ...prev,
        xp: prev.xp + 50
      }));
    } else {
      setGamification(prev => ({
        ...prev,
        xp: Math.max(0, prev.xp - 20)
      }));
    }
  };

  return (
    <VibeContext.Provider value={{
      user, setUser,
      transactions, addTransaction,
      goals,
      voiceSettings, setVoiceSettings,
      gamification, setGamification
    }}>
      {children}
    </VibeContext.Provider>
  );
};

export const useVibe = () => {
  const context = useContext(VibeContext);
  if (!context) throw new Error('useVibe must be used within a VibeProvider');
  return context;
};
