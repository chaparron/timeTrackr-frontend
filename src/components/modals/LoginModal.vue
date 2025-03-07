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
    login() {
      console.log('Login with:', this.email, this.password);
      this.$emit('close');
    },
  },
});
</script>