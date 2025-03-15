<template>
  <BaseModal title="Log In" @close="$emit('close')">
    <template #form>
      <ModalForm @submit="login">        
        <div v-if="errorMessage" class="error-message">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <BaseButton class="modal-button">Log In</BaseButton>
      </ModalForm>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '../base/BaseModal.vue';
import ModalForm from '../base/ModalForm.vue';
import BaseButton from '../base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth.store';
import { AuthService } from '@/services/auth.service';

export default defineComponent({
  name: 'LoginModal',
  components: {
    BaseModal,
    ModalForm,
    BaseButton,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      try {
        const response = await AuthService.login(this.email, this.password);
        const authStore = useAuthStore();
        authStore.loginSuccess(response.access_token, response);
        this.$emit('close');
      } catch (error: any) {
        this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        console.error('Login failed:', error);
      }
    }
}
});
</script>

<style scoped>
.error-message {
  color: #721c24;
  padding: 1rem;
  margin: 1rem 0;
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  animation: shake 0.5s ease-in-out;
}

.error-message .icon {
  width: 24px;
  height: 24px;
  fill: #721c24;
  flex-shrink: 0;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

</style>