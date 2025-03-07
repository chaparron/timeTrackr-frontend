<template>
  <BaseModal title="Sign up" @close="$emit('close')">
    <template #form>
      <ModalForm @submit="register">
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

export default defineComponent({
  name: 'RegisterModal',
  components: {
    BaseModal,
    ModalForm,
    BaseButton,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      console.log('Registering with:', this.name, this.email, this.password);
      this.$emit('close');
    },
  },
});
</script>