<template>
  <div v-if="isAuthenticated" class="authenticated-view">
    <h2>Your Events</h2>
    <div v-if="!hasEvents">
      <p>No events found. Start by creating your first event!</p>
    </div>
  </div>
  
  <div v-else class="home">
    <h1>Welcome to TrackerLogger</h1>
    <p>TimeTrakr is a productivity tracking tool designed to help you measure and analyze your work efficiency.</p>
    <p>It allows you to log activities in a calendar, specify the time spent on each task, and visualize the data in various ways (e.g., by day or sprint).</p>
    <p>The goal is to provide you with a clear overview of your time usage, enabling you to make informed decisions and optimize your workflow.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useEventStore } from '@/stores/event.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const eventStore = useEventStore();
    
    const { isAuthenticated } = storeToRefs(authStore);
    const { events } = storeToRefs(eventStore);

    const hasEvents = computed(() => events.value.length > 0);

    return {
      isAuthenticated,
      hasEvents
    };
  }
});
</script>

<style scoped>
.home,
.authenticated-view {
  padding: var(--spacing-large);
  text-align: center;
}

h1,
h2 {
  font-size: var(--font-size-xlarge);
  margin-bottom: var(--spacing-medium);
}

p {
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin-bottom: var(--spacing-medium);
}
</style>