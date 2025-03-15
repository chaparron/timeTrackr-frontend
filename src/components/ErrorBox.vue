<template>
    <div v-if="errorMessage" class="error-message">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      {{ errorMessage }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ErrorBox',
    props: {
      errorMessage: {
        type: String,
        required: false,
        default: ''
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