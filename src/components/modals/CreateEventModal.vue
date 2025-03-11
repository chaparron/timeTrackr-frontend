<template>
  <BaseModal xl title="Create Event" @close="$emit('close')">
    <template #form>
      <ModalForm @submit="createEvent">

        <div class="form-row">
          <div class="form-group">
            <input type="text" id="title" v-model="eventData.title" required />
          </div>
          <div class="form-group">
            <input type="text" id="type" v-model="eventData.type" required />
          </div>
        </div>

        <div v-for="(date, dateIndex) in eventData.dates" :key="dateIndex" class="form-group day-selector">
          <input type="date" v-model="date.day" required />

          <div v-for="(hour, hourIndex) in date.hours" :key="hourIndex" class="form-row time-selector">
            <div class="form-group">
              <input type="time" v-model="hour.start" required />
            </div>
            <div class="form-group">
              <input type="time" v-model="hour.end" required />
            </div>
             <div class="form-row time-buttons">
              <button type="button" class="add" @click="addTime(dateIndex)">Add Time</button>
            </div>
            <div class="time-buttons">
              <button type="button" class="delete" @click="deleteTime(dateIndex, hourIndex)">Delete</button>
            </div>
          </div>



          <div class="form-row day-buttons">
            <button type="button" class="delete" @click="deleteDay(dateIndex)">Delete Day</button>
          </div>
        </div>

        <div class="form-row day-buttons">
          <button type="button" class="add" @click="addDay">Add Day</button>
        </div>

        <div class="form-group">
          <textarea id="description" v-model="eventData.description"></textarea>
        </div>

        <BaseButton class="modal-button">Create Event</BaseButton>
      </ModalForm>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '../base/BaseModal.vue';
import ModalForm from '../base/ModalForm.vue';
import BaseButton from '../base/BaseButton.vue';
import { EventService } from '@/services/event.service';
import { useEventStore } from '@/stores/event.store';

export default defineComponent({
  name: 'CreateEventModal',
  components: {
    BaseModal,
    ModalForm,
    BaseButton,
  },
  props: {
    selectedDay: {
      type: String,
      required: true,
    },
  },
  data() {
  return {
    eventData: {
      title: 'Title',
      description: 'Description',
      type: 'Type',
      dates: [
        {
          day: this.selectedDay,
          hours: [
            { start: '09:00', end: '10:00' }
          ]
        }
      ]
    },
  };
},
methods: {
  addDay() {
    this.eventData.dates.push({
      day: this.selectedDay,
      hours: [{ start: '09:00', end: '10:00' }]
    });
  },
  
  deleteDay(dateIndex: number) {
    this.eventData.dates.splice(dateIndex, 1);
  },
  
  addTime(dateIndex: number) {
    this.eventData.dates[dateIndex].hours.push({ 
      start: '09:00', 
      end: '10:00' 
    });
  },
  
  deleteTime(dateIndex: number, hourIndex: number) {
    this.eventData.dates[dateIndex].hours.splice(hourIndex, 1);
  },

  async createEvent() {
    try {
      const eventPayload = {
        title: this.eventData.title,
        description: this.eventData.description,
        type: this.eventData.type,
        dates: this.eventData.dates
      };

      await EventService.createEvent(eventPayload);
      const eventStore = useEventStore();
      await eventStore.loadEvents();
      this.$emit('event-created');
      this.$emit('close');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }
}
});
</script>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-small);
}

.form-row {
  display: flex;
  gap: var(--spacing-small);
  margin-bottom: var(--spacing-small);
}

.form-row .form-group {
  flex: 1;
}

.day-selector {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.time-selector {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.day-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-small);
}

.add {
  background-color: var(--color-secondary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--border-radius);
}

.add:hover {
  background-color: var(--color-secondary-hover);
}

.delete {
  background-color: var(--color-cancel);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--border-radius);
}

.delete:hover {
  background-color: var(--color-cancel-hover);
}

label {
  display: block;
  margin-bottom: var(--spacing-small);
}

input,
textarea {
  width: 100%;
  padding: var(--spacing-small);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

textarea {
  min-height: 100px;
  resize: vertical;
}
</style>