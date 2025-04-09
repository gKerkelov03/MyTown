import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication logic
    // For now, we'll simulate a successful login
    set({
      user: {
        id: '1',
        name: 'Test User',
        email: email,
      },
      isAuthenticated: true,
    });
  },
  register: async (name: string, email: string, password: string) => {
    // TODO: Implement actual registration logic
    // For now, we'll simulate a successful registration
    set({
      user: {
        id: '1',
        name: name,
        email: email,
      },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
})); 