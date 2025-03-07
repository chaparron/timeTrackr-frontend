<template>
  <div class="home">
    <h1>Welcome to TrackerLogger</h1>
    <p>TimeTrakr is a productivity tracking tool designed to help you measure and analyze your work efficiency.</p>
    <p>It allows you to log activities in a calendar, specify the time spent on each task, and visualize the data in various ways (e.g., by day or sprint).</p>
    <p>The goal is to provide you with a clear overview of your time usage, enabling you to make informed decisions and optimize your workflow.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
.home {
  padding: var(--spacing-large);
  text-align: center;
}

h1 {
  font-size: var(--font-size-xlarge);
  margin-bottom: var(--spacing-medium);
}

p {
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin-bottom: var(--spacing-medium);
}
</style>