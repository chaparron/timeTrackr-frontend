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

        <div class="form-group day-selector">
          <input type="date" id="day" v-model="eventData.day" required />

          <div class="form-row time-selector">
            <div class="form-group">
              <input type="time" id="startTime" v-model="eventData.startTime" required />
            </div>
            <div class="form-group">
              <input type="time" id="endTime" v-model="eventData.endTime" />
            </div>
            <div class="time-buttons">
              <button type="button" class="add" @click="addTime">add</button>
              <button type="button" class="delete" @click="deleteTime">delete</button>
            </div>
          </div>
          <div class="form-row day-buttons">
            <button type="button" class="add" @click="addDay">add</button>
            <button type="button" class="delete" @click="deleteDay">delete</button>
          </div>
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
        day: this.selectedDay,
        startTime: '09:00',
        endTime: '10:00',
      },
    };
  },
  methods: {
    async createEvent() {
      try {
        const eventPayload = {
          title: this.eventData.title,
          description: this.eventData.description,
          type: this.eventData.type,
          dates: [
            {
              day: this.eventData.day,
              hours: [
                {
                  start: this.eventData.startTime,
                  end: this.eventData.endTime,
                },
              ],
            },
          ],
        };

        await EventService.createEvent(eventPayload);
        const eventStore = useEventStore();
        await eventStore.loadEvents();
        this.$emit('event-created');
        this.$emit('close');
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },
    addDay() {
      alert('Add day coming soon...');
    },
    deleteDay() {
      alert('Delete day coming soon...');
    },
    addTime() {
      alert('Add time coming soon...');
    },
    deleteTime() {
      alert('Delete time coming soon...');
    },
  },
});
</script>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-medium);
}

.form-row {
  display: flex;
  gap: var(--spacing-medium);
  margin-bottom: var(--spacing-medium);
}

.form-row .form-group {
  flex: 1;
}

.day-selector {
  text-align: center;
  margin-bottom: var(--spacing-large);
  border: 1px solid white;
  border-radius: var(--border-radius);
}

.day-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-medium);
}

.time-selector {
  margin: 10px 20px;
  display: flex;
  gap: var(--spacing-medium);
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