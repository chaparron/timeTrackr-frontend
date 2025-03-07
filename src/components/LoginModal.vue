<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Log Into TrackerLogger</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Login with:', this.email, this.password);
    },
    closeModal() {
      this.$emit('close');
    },
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal {
  background-color: var(--color-primary);
  padding: var(--spacing-large);
  border-radius: var(--border-radius);
  width: 300px;
  text-align: center;
}

.form-group {
  margin-bottom: var(--spacing-medium);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-small);
}

.form-group input {
  width: 100%;
  padding: var(--spacing-small);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

button {
  margin-top: var(--spacing-medium);
  padding: var(--spacing-small) var(--spacing-medium);
  background-color: var(--color-secondary);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: var(--border-radius);
}

button:hover {
  background-color: var(--color-secondary-hover);
}
</style>