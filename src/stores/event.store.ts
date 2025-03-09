import { defineStore } from 'pinia';
import type { EventResponse } from '@/types/event';
import { EventService } from '@/services/event.service';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as EventResponse[],
    isLoading: false,
  }),
  actions: {
    setEvents(events: EventResponse[]) {
      this.events = events;
    },
    addEvent(event: EventResponse) {
      this.events.push(event);
    },
    updateEvent(updatedEvent: EventResponse) {
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        this.events.splice(index, 1, updatedEvent);
      }
    },
    removeEvent(eventId: number) {
      this.events = this.events.filter(e => e.id !== eventId);
    },
    async loadEvents() {
      this.isLoading = true;
      try {
        const events = await EventService.getAllEvents();
        this.setEvents(events);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getEvents: (state) => state.events,
    getEventById: (state) => (id: number) => state.events.find(e => e.id === id),
  },
});