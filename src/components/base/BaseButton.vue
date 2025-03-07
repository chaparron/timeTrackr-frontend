<template>
    <button :class="buttonClass" @click="$emit('click')">
      <slot></slot>
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Button',
    emits: ['click'],
    props: {
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
    margin: 0 0 0 15px
  }
  
  button:hover {
    background-color: var(--color-secondary-hover);
  }
  
  .button.modal-button {
    padding: var(--spacing-small) var(--spacing-medium);
    background-color: var(--color-secondary);
    border: none;
    color: white;
    cursor: pointer;
    border-radius: var(--border-radius);
  }
  
  .button.modal-button:hover {
    background-color: var(--color-secondary-hover);
  }
  </style>