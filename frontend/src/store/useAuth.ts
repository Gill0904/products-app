import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  user: any;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token: string) => {
        const user = jwtDecode(token);
        set({ token, user });
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
