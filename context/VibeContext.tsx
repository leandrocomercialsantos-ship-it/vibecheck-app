
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, Transaction, Goal, VoiceSettings, Gamification } from '../types.ts';
import { INITIAL_GOALS } from '../constants.ts';

interface VibeContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  transactions: Transaction[];
  addTransaction: (amount: number, type: Transaction['type'], description: string) => void;
  goals: Goal[];
  voiceSettings: VoiceSettings;
  setVoiceSettings: (settings: VoiceSettings) => void;
  gamification: Gamification;
  setGamification: React.Dispatch<React.SetStateAction<Gamification>>;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

const STORAGE_KEY = 'vibecheck_user_data';

export const VibeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vibe',
      vibe: 'Iniciando jornada 🛡️',
      guardianContact: '',
      isBankConnected: false,
    };
  });

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    personality: 'friendly',
  });

  const [gamification, setGamification] = useState<Gamification>({
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    badges: [],
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

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
      setGamification(prev => {
        const newXp = prev.xp + 50;
        if (newXp >= prev.nextLevelXp) {
          return {
            ...prev,
            level: prev.level + 1,
            xp: newXp - prev.nextLevelXp,
            nextLevelXp: prev.nextLevelXp + 150
          };
        }
        return { ...prev, xp: newXp };
      });
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
