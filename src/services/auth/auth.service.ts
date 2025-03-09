import type { AuthResponse } from '@/types/auth';
import api from '../../api';

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  async getMe(): Promise<AuthResponse> {
    const response = await api.get('/auth/me');
    return response.data;
  }
};