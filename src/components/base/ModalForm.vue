<template>
    <form @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Form',
    emits: ['submit'],
  });
  </script>
  
  <style scoped>
  :deep(.form-group) {
    margin-bottom: var(--spacing-medium);
  }
  
  :deep(.form-group label) {
    display: block;
    margin-bottom: var(--spacing-small);
  }
  
  :deep(.form-group input) {
    width: 100%;
    padding: var(--spacing-small);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }
  </style>