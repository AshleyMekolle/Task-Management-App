<template>
  <div class="app-container">
    <task-list />
  </div>
</template>

<script setup>
import TaskList from './components/TaskList.vue';
</script>

<style>
/* Global CSS Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', 'Open Sans', sans-serif;
  background-color: #f9f9f9;
  color: #333333;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  padding: 24px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    padding: 16px;
  }
}
</style>