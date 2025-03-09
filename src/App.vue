<template>
  <Navbar @open-login="isLoginModalOpen = true" @open-register="isRegisterModalOpen = true" />
  <HomeView />
  <LoginModal v-if="isLoginModalOpen" @close="isLoginModalOpen = false" />
  <RegisterModal v-if="isRegisterModalOpen" @close="isRegisterModalOpen = false" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import HomeView from './views/HomeView.vue';
import LoginModal from './components/modals/LoginModal.vue';
import RegisterModal from './components/modals/RegisterModal.vue';
import { useAuthStore } from './stores/auth.store';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    HomeView,
    LoginModal,
    RegisterModal,
  },
  setup() {
    const authStore = useAuthStore();
    const isLoginModalOpen = ref(false);
    const isRegisterModalOpen = ref(false);

    onMounted(() => {
      authStore.initAuth();
    });

    return {
      isLoginModalOpen,
      isRegisterModalOpen,
    };
  },
});
</script>
