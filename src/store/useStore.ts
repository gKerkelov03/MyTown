import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  userRole: 'citizen' | 'moderator' | 'admin' | null;
  setUser: (user: User | null) => void;
  setUserRole: (role: 'citizen' | 'moderator' | 'admin' | null) => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  userRole: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setUserRole: (role) => set({ userRole: role }),
  logout: () => set({ user: null, isAuthenticated: false, userRole: null }),
})); 