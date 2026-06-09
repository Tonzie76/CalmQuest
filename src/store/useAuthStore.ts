import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'premium_monthly' | 'premium_yearly';
  joinDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  upgradeTier: (tier: 'premium_monthly' | 'premium_yearly') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, name) => {
        set({ isLoading: true });
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ 
          user: { 
            id: 'mock-user-123', 
            email, 
            name, 
            tier: 'free',
            joinDate: new Date().toISOString().split('T')[0]
          }, 
          isAuthenticated: true,
          isLoading: false 
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      upgradeTier: (tier) => {
        set((state) => ({
          user: state.user ? { ...state.user, tier } : null
        }));
      }
    }),
    {
      name: 'calm-quest-auth',
    }
  )
);
