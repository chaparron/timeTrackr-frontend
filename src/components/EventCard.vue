<template>
    <div class="event-card">
      <div class="event-time">
        {{ formatTime(event.dates[0].hours[0].start) }} - 
        {{ formatTime(event.dates[0].hours[0].end) }}
      </div>
      <div class="event-details">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p class="event-type">{{ event.type }}</p>
      </div>
      <BaseButton class="delete-button" @click="handleDelete">Delete</BaseButton>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import type { EventResponse } from '@/types/event';
  
  export default defineComponent({
    name: 'EventCard',
    components: {
      BaseButton,
    },
    props: {
      event: {
        type: Object as PropType<EventResponse>,
        required: true,
      },
    },
    methods: {
      formatTime(time: string) {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      handleDelete() {
        this.$emit('delete', this.event.id);
      },
    },
  });
  </script>
  
  <style scoped>
  .event-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-medium);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-medium);
    background-color: var(--color-background-light);
  }
  
  .event-time {
    font-weight: bold;
    min-width: 120px;
  }
  
  .event-details {
    flex: 1;
    margin: 0 var(--spacing-medium);
  }
  
  .event-type {
    font-style: italic;
    color: var(--color-text-secondary);
  }
  
  .delete-button {
    background-color: var(--color-cancel);
    color: white;
  }
  
  .delete-button:hover {
    background-color: var(--color-cancel-hover);
  }
  </style>