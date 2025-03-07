<template>
  <nav class="navbar">
    <div class="navbar-brand">TimeTrakr</div>
    <div class="navbar-actions">
      <BaseButton @click="openRegisterModal">Sign up</BaseButton>
      <BaseButton @click="openLoginModal">Login</BaseButton>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './base/BaseButton.vue';

export default defineComponent({
  name: 'Navbar',
  methods: {
    openLoginModal() {
      this.$emit('open-login');
    },
    openRegisterModal() {
      this.$emit('open-register');
    },
  }, components: {
    BaseButton,
  },
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
</style>