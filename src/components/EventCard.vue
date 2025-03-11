<template>
  <div class="event-card">
    <div class="content-wrapper">
      <div class="header">
        <h3 class="title">{{ event.title }}</h3>
        <span class="type">{{ event.type }}</span>
      </div>

      <p v-if="event.description" class="description">{{ event.description }}</p>

      <div class="hours-summary">
        <div class="total-hours">
          <strong>Total hours:</strong> {{ formatDuration(event.totalHours) }}
        </div>

        <div v-for="date in event.dates" :key="date.day" class="date-entry">
          <div class="date-header">
            <strong>{{ formatDate(date.day) }}</strong>
            <span>{{ formatDuration(date.duration) }}</span>
          </div>
          <div v-for="(hour, index) in date.hours" :key="index" class="time-slot">
            {{ formatTime(hour.start) }} - {{ formatTime(hour.end) }}
            <span>({{ formatDuration(hour.duration) }})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <BaseButton @click="handleEdit">Edit</BaseButton>
      <BaseButton cancel class="delete-button" @click="handleDelete">Delete</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import type { EventResponse, Duration } from '@/types/event';

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
    formatDuration(duration: Duration) {
      const hours = duration.hours.toString().padStart(2, '0');
      const minutes = duration.minutes.toString().padStart(2, '0');
      return `${hours}h ${minutes}m`;
    },
    formatDate(dateString: string) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    handleDelete() {
      this.$emit('delete', this.event.id);
    },
    handleEdit() {
      alert("Edit event comming soon...");
    },
  },
});
</script>

<style scoped>
.event-card {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-medium);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-medium);
  background-color: var(--color-background-light);
  gap: var(--spacing-medium);
}

.content-wrapper {
  flex: 1;
}

.header {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-small);
  margin-bottom: var(--spacing-small);
}

.title {
  margin: 0;
  font-size: 1.2rem;
}

.type {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.description {
  margin: 0 0 var(--spacing-small) 0;
  color: var(--color-text-secondary);
}

.hours-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.date-entry {
  padding: var(--spacing-small);
  background-color: var(--color-background);
  border-radius: var(--border-radius);
}

.date-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.time-slot {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: var(--spacing-xs) 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
  min-width: 100px;
}

.edit-button {
  background-color: var(--color-primary);
  color: white;
}

.edit-button:hover {
  background-color: var(--color-primary-hover);
}

.delete-button {
  background-color: var(--color-cancel);
  color: white;
}

.delete-button:hover {
  background-color: var(--color-cancel-hover);
}

@media (max-width: 768px) {
  .event-card {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>