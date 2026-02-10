import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, Transaction, Goal, VoiceSettings, Gamification } from '../types.ts';

interface VibeContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  transactions: Transaction[];
  addTransaction: (amount: number, type: Transaction['type'], description: string) => void;
  goals: Goal[];
  addGoal: (name: string, targetAmount: number) => void;
  updateGoalAmount: (goalId: string, amount: number) => void;
  renameGoal: (goalId: string, newName: string) => void;
  // Fix: changed return type to boolean to allow the caller to know if the deletion was confirmed/successful
  deleteGoal: (goalId: string) => boolean;
  voiceSettings: VoiceSettings;
  setVoiceSettings: (settings: VoiceSettings) => void;
  gamification: Gamification;
  setGamification: React.Dispatch<React.SetStateAction<Gamification>>;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

const USER_KEY = 'vibecheck_user_data';
const TRANSACTIONS_KEY = 'vibecheck_transactions';
const GOALS_KEY = 'vibecheck_goals';

export const VibeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vibe',
      vibe: 'Iniciando jornada 🛡️',
      guardianContact: '',
      isBankConnected: false,
      monthlyBudget: 3000,
    };
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(TRANSACTIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(GOALS_KEY);
    return saved ? JSON.parse(saved) : [];
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

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = (name: string, targetAmount: number) => {
    const newGoal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      targetAmount,
      currentAmount: 0,
      icon: '🎯'
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalAmount = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount } 
        : goal
    ));
    
    setGamification(prev => {
      const newXp = prev.xp + 25;
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
  };

  const renameGoal = (goalId: string, newName: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, name: newName } : goal
    ));
  };

  // Fix: changed return type to boolean to allow the caller to know if the deletion was confirmed/successful
  const deleteGoal = (goalId: string): boolean => {
    if (confirm("Tem certeza que deseja excluir esta meta permanentemente?")) {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      return true;
    }
    return false;
  };

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
      goals, addGoal, updateGoalAmount, renameGoal, deleteGoal,
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
