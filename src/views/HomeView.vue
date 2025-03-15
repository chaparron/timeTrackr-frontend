<template>
  <div v-if="isAuthenticated" class="authenticated-view">
    <div class="controls-container">
      <div class="controls">
        <input
          type="date"
          v-model="selectedDay"
          class="day-selector"
        />
        <BaseButton @click="openCreateEventModal">Create Event</BaseButton>
      </div>
    </div>

    <h2>Your Events</h2>

    <div v-if="eventStore.isLoading">
      <p>Loading events...</p>
    </div>

    <div v-else-if="todayEvents.length === 0">
      <p>No events found for the selected day. Create your first event!</p>
    </div>

    <div v-else class="events-list">
      <EventCard
        v-for="event in todayEvents"
        :key="event.id"
        :event="event"
        @delete="deleteEvent"
      />
    </div>

    <CreateEventModal
      v-if="isCreateEventModalOpen"
      :selectedDay="selectedDay"
      @close="isCreateEventModalOpen = false"
      @event-created="handleEventCreated"
    />
  </div>

  <div v-else class="home">
    <h1>Welcome to TrackerLogger</h1>
    <p>TimeTrakr is a productivity tracking tool designed to help you measure and analyze your work efficiency.</p>
    <p>It allows you to log activities in a calendar, specify the time spent on each task, and visualize the data in various ways (e.g., by day or sprint).</p>
    <p>The goal is to provide you with a clear overview of your time usage, enabling you to make informed decisions and optimize your workflow.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useEventStore } from '@/stores/event.store';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/base/BaseButton.vue';
import CreateEventModal from '@/components/modals/CreateEventModal.vue';
import EventCard from '@/components/EventCard.vue';
import { EventService } from '@/services/event.service';

export default defineComponent({
  components: {
    BaseButton,
    CreateEventModal,
    EventCard,
  },
  setup() {
    const authStore = useAuthStore();
    const eventStore = useEventStore();
    const { isAuthenticated } = storeToRefs(authStore);
    const selectedDay = ref(new Date().toISOString().split('T')[0]);
    const isCreateEventModalOpen = ref(false);

    watch(isAuthenticated, async (newVal) => {
      if (newVal) {
        await eventStore.loadEvents();
      }
    });

    onMounted(async () => {
      if (isAuthenticated.value) {
        await eventStore.loadEvents();
      }
    });

    const todayEvents = computed(() => {
      return eventStore.events
        .filter(event =>
          event.dates.some(date => date.day === selectedDay.value)
        )
        .sort((a, b) => {
          const timeA = a.dates[0].hours[0].start;
          const timeB = b.dates[0].hours[0].start;
          return timeA.localeCompare(timeB);
        });
    });

    const openCreateEventModal = () => {
      isCreateEventModalOpen.value = true;
    };

    const handleEventCreated = async () => {
      await eventStore.loadEvents();
      isCreateEventModalOpen.value = false;
    };

    const deleteEvent = async (eventId: number) => {
      try {
        await EventService.deleteEvent(eventId);
        eventStore.removeEvent(eventId);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

    return {
      isAuthenticated,
      eventStore,
      selectedDay,
      isCreateEventModalOpen,
      todayEvents,
      openCreateEventModal,
      handleEventCreated,
      deleteEvent,
    };
  },
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

.controls-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-large);
}

.controls {
  display: flex;
  gap: var(--spacing-medium);
  align-items: center;
}

.day-selector {
  padding: var(--spacing-small);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

.events-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>