<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal" :class="{ xl }">
        <h2 class="title">{{ title }}</h2>
        <slot name="form"></slot>
        <div class="modal-buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Modal',
    props: {
      title: {
        type: String,
        required: true,
      },
      xl: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
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
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    overflow-y: auto;
    padding: 20px 0;
  }
  
  .modal {
    background-color: var(--color-primary);
    padding: var(--spacing-large);
    border-radius: var(--border-radius);
    width: 30%;
    text-align: center;
    overflow-y: auto;
    max-height: 90vh;
  }

  .xl {
    width: 80%;
  }
  
  .modal-buttons {
    margin-top: var(--spacing-medium);
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: var(--font-size-large);
    font-weight: bold;
    margin: 0 0 20px;
  }
  
</style>