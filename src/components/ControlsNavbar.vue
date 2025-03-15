<template>
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
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    selectedDay: {
      type: String,
      required: true,
    },
    openCreateEventModal: {
      type: Function as PropType<() => void>,
      required: true,
    },
    updateSelectedDay: {
        type: Function as PropType<(day: string) => void>,
        required: true,
    }
  },
  setup(props) {
    const selectedDay = ref(props.selectedDay);

    const handleDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        props.updateSelectedDay(target.value);
    }
    return {
        selectedDay,
        handleDateChange
    };
  },
    watch: {
        selectedDay(newVal){
            this.updateSelectedDay(newVal);
        }
    }
});
</script>

<style scoped>
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
</style>