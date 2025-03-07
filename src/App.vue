<template>
  <Navbar @open-login="isLoginModalOpen = true" @open-register="isRegisterModalOpen = true" />
  <HomeView />
  <LoginModal v-if="isLoginModalOpen" @close="isLoginModalOpen = false" />
  <RegisterModal v-if="isRegisterModalOpen" @close="isRegisterModalOpen = false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import HomeView from './views/HomeView.vue';
import LoginModal from './components/LoginModal.vue';
import RegisterModal from './components/RegisterModal.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    HomeView,
    LoginModal,
    RegisterModal,
  },
  setup() {
    const isLoginModalOpen = ref(false);
    const isRegisterModalOpen = ref(false);

    return {
      isLoginModalOpen,
      isRegisterModalOpen,
    };
  },
});
</script>
