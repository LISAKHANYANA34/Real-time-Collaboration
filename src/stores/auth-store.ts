import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'user',
            createdAt: new Date(),
          }
          
          set({
            user: mockUser,
            token: 'mock-jwt-token',
            isLoading: false,
          })
        } catch (error) {
          set({
            error: 'Invalid email or password',
            isLoading: false,
          })
        }
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser: User = {
            id: '1',
            email,
            name,
            role: 'user',
            createdAt: new Date(),
          }
          
          set({
            user: mockUser,
            token: 'mock-jwt-token',
            isLoading: false,
          })
        } catch (error) {
          set({
            error: 'Error creating account',
            isLoading: false,
          })
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        })
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          set({ isLoading: false })
        } catch (error) {
          set({
            error: 'Error resetting password',
            isLoading: false,
          })
        }
      },

      updateUser: (user: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        }))
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
