<template>
  <button 
    :class="['button', { 'cancel': cancel }, buttonClass]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  emits: ['click'],
  props: {
    cancel: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
button {
  padding: var(--spacing-small) var(--spacing-medium);
  background-color: var(--color-secondary);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: var(--border-radius);
  margin: 0 0 0 15px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--color-secondary-hover);
}

button.cancel {
  background-color: var(--color-cancel);
}

button.cancel:hover {
  background-color: var(--color-cancel-hover);
}

.button.modal-button {
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
}
</style>