<template>
  <div class="task-item" :class="{ 'task-completed': task.status === 'completed' }">
    <div class="task-content">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-description">{{ task.description }}</p>
      <span class="task-status" :class="task.status">
        {{ task.status.charAt(0).toUpperCase() + task.status.slice(1) }}
      </span>
    </div>
    <div class="task-actions">
      <button 
        class="btn toggle-btn" 
        @click="toggleStatus"
      >
        {{ task.status === 'pending' ? 'Complete' : 'Mark as Pending' }}
      </button>
      <button class="btn edit-btn" @click="$emit('edit', task)">Edit</button>
      <button class="btn delete-btn" @click="$emit('delete', task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete', 'toggle-status']);

const toggleStatus = () => {
  const newStatus = props.task.status === 'pending' ? 'completed' : 'pending';
  emit('toggle-status', { ...props.task, status: newStatus });
};
</script>

<style>
.task-item {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.task-item.task-completed {
  background-color: #f8f8f8;
  border-left: 4px solid #4caf50;
}

.task-content {
  flex: 1;
}

.task-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333333;
}

.task-description {
  margin: 0 0 8px 0;
  color: #666666;
  font-size: 14px;
}

.task-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.task-status.pending {
  background-color: #ffecb3;
  color: #ff9800;
}

.task-status.completed {
  background-color: #e8f5e9;
  color: #4caf50;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
}

.toggle-btn {
  background-color: #e0e0e0;
  color: #333333;
}

.toggle-btn:hover {
  background-color: #d0d0d0;
}

.edit-btn {
  background-color: #2196f3;
  color: white;
}

.edit-btn:hover {
  background-color: #1976d2;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .task-actions {
    margin-top: 12px;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>