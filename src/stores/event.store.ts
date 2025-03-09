import type { EventResponse } from '@/types/event';
import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as EventResponse[],
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
    }
  },
  getters: {
    getEvents: (state) => state.events,
    getEventById: (state) => (id: number) => state.events.find(e => e.id === id)
  }
});