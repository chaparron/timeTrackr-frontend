import api from '@/api';
import type { EventResponse } from '@/types/event';

export const EventService = {
  async createEvent(eventData: any): Promise<EventResponse> {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async getAllEvents(): Promise<EventResponse[]> {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async updateEvent(id: number, eventData: any): Promise<EventResponse> {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(id: number): Promise<void> {
    try {
      await api.delete(`/events/${id}`);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};