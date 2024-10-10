import { create } from 'zustand';
import { login } from './login';
import { signUp } from './signUp';
import { logout } from './logout';
import { checkAuth } from './checkAuth';
import { changePassword } from './changePassword';
import { forgotPassword } from './forgotPassword'; // Importa a função de forgotPassword

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, passwordConfirmation: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>; // Adicionando a assinatura da função
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Função de login
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await login(email, password, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro no login. Verifique suas credenciais.' });
    }
  },

  // Função de sign up
  signUp: async (email: string, password: string, passwordConfirmation: string, name: string) => {
    try {
      set({ isLoading: true, error: null });
      await signUp(email, password, passwordConfirmation, name, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro no registro. Verifique suas informações.' });
    }
  },

  // Função de logout
  logout: async () => {
    try {
      set({ isLoading: true });
      await logout(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro no logout.' });
    }
  },

  // Função de verificação de autenticação
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      await checkAuth(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, token: null, isAuthenticated: false });
    }
  },

  // Função de troca de senha
  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      set({ isLoading: true });
      await changePassword(currentPassword, newPassword, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro ao alterar a senha.' });
    }
  },

  // Função de recuperação de senha (forgot password)
  forgotPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      await forgotPassword(email, set); // Chama a função forgotPassword
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro ao tentar recuperar a senha.' });
    }
  },
}));
