<template>
  <nav class="navbar">
    <div class="navbar-brand">TimeTrakr</div>
    <div class="navbar-actions">
      <button @click="openRegisterModal">Sign up</button>
      <button @click="openLoginModal">Login</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  methods: {
    openLoginModal() {
      this.$emit('open-login');
    },
    openRegisterModal() {
      this.$emit('open-register');
    },
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

.navbar-actions button {
  margin-left: var(--spacing-medium);
  padding: var(--spacing-small) var(--spacing-medium);
  background-color: var(--color-secondary);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: var(--border-radius);
}

.navbar-actions button:hover {
  background-color: var(--color-secondary-hover);
}
</style>