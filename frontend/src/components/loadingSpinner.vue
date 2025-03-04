<template>
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <span v-if="text" class="loading-text">{{ text }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    text?: string
  }>()
  </script>
  
  <style scoped>
  /* Loading Container */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    width: 2rem; 
    height: 2rem; 
    border: 2px solid #2563eb; 
    border-radius: 50%; 
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Loading Text */
  .loading-text {
    margin-left: 0.5rem; 
    color: #4b5563; 
  }
  </style>