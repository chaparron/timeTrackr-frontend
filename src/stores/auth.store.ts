import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AuthResponse } from '@/types/auth';
import type { User } from '@/types/user';
import { AuthService } from '@/services/auth.service';
import { useEventStore } from './event.store';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const initAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    try {
      const userData = await AuthService.getMe();
      user.value = userData;
      isAuthenticated.value = true;
      
      const eventStore = useEventStore();
      await eventStore.loadEvents();
    } catch (error) {
      logout();
    }
  };

  const loginSuccess = (token: string, authResponse: AuthResponse) => {
    localStorage.setItem('access_token', token);
    user.value = authResponse.user;
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    user.value = null;
    isAuthenticated.value = false;
    useEventStore().$reset();
  };

  return {
    user,
    isAuthenticated,
    initAuth,
    loginSuccess,
    logout
  };
});