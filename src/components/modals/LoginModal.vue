<template>
  <BaseModal title="Log In" @close="$emit('close')">
    <template #form>
      <ModalForm @submit="login">
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
import { AuthService } from '@/services/auth/auth.service';

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
    };
  },
  methods: {
  async login() {
    try {
      const response = await AuthService.login(this.email, this.password);
      
      const authStore = useAuthStore();
      authStore.loginSuccess(response.access_token, response.user);
      
      this.$emit('login-success', response);
      this.$emit('close');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
});
</script>