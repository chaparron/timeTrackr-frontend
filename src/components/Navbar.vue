<template>
  <nav class="navbar">
    <div class="navbar-brand">TimeTrakr</div>
    <div class="navbar-actions">
      <template v-if="isAuthenticated">
        <span class="greeting">Hello {{ user?.username }}</span>
        <BaseButton @click="logout">Logout</BaseButton>
      </template>
      <template v-else>
        <BaseButton @click="openRegisterModal">Sign up</BaseButton>
        <BaseButton @click="openLoginModal">Login</BaseButton>
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import BaseButton from './base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth.store';

export default defineComponent({
  name: 'Navbar',
  components: { BaseButton },
  emits: ['open-login', 'open-register'],
  
  setup(_, { emit }) {
    const authStore = useAuthStore();
    const { isAuthenticated, user } = storeToRefs(authStore);

    const logout = () => authStore.logout();
    const openLoginModal = () => emit('open-login');
    const openRegisterModal = () => emit('open-register');

    return {
      isAuthenticated,
      user,
      logout,
      openLoginModal,
      openRegisterModal
    };
  }
});
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: white;
  z-index: 100;
}

.navbar-brand {
  font-size: var(--font-size-large);
  font-weight: bold;
}

.greeting {
  margin-right: var(--spacing-medium);
}
</style>