import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ email: string; username: string } | null>(null);
  const isAuthenticated = ref(false);

  const initAuth = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      isAuthenticated.value = true;
    }
  };

  const loginSuccess = (token: string, userData: { email: string; username: string }) => {
    localStorage.setItem('access_token', token);
    user.value = userData;
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    user.value = null;
    isAuthenticated.value = false;
  };

  return { user, isAuthenticated, initAuth, loginSuccess, logout };
});