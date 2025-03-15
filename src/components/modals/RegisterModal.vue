<template>
  <BaseModal title="Sign up" @close="$emit('close')">
    <template #form>
      <ModalForm @submit="register">
        <ErrorBox :errorMessage="errorMessage" />
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <BaseButton class="modal-button">Sign up</BaseButton>
      </ModalForm>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '../base/BaseModal.vue';
import ModalForm from '../base/ModalForm.vue';
import BaseButton from '../base/BaseButton.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import { useAuthStore } from '@/stores/auth.store';
import { AuthService } from '@/services/auth.service';

export default defineComponent({
  name: 'RegisterModal',
  components: {
    BaseModal,
    ModalForm,
    BaseButton,
    ErrorBox,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      this.errorMessage = '';
      try {
        const response = await AuthService.register(this.name, this.email, this.password);
        const authStore = useAuthStore();
        authStore.loginSuccess(response.access_token, response);
        this.$emit('close');
      } catch (error: any) {
        this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        console.error('Registration failed:', error);
      }
    }
  }
});
</script>