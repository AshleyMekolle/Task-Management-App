<template>
  <div class="task-form-container">
    <h2 class="form-title">{{ isEditing ? 'Edit Task' : 'Create New Task' }}</h2>
    <form @submit.prevent="submitForm" class="task-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          type="text" 
          id="title" 
          v-model="form.title" 
          class="form-control"
          :class="{ 'is-invalid': errors.title }"
        >
        <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          class="form-control"
          rows="4"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="status">Status</label>
        <select 
          id="status" 
          v-model="form.status" 
          class="form-control"
          :class="{ 'is-invalid': errors.status }"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn cancel-btn" @click="$emit('cancel')">Cancel</button>
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update Task' : 'Create Task' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
      status: 'pending'
    })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const form = reactive({
  id: null,
  title: '',
  description: '',
  status: 'pending'
});

const errors = reactive({
  title: '',
  status: ''
});

onMounted(() => {
  if (props.task) {
    form.id = props.task.id;
    form.title = props.task.title;
    form.description = props.task.description || '';
    form.status = props.task.status;
  }
});

const validateForm = () => {
  let isValid = true;
  errors.title = '';
  errors.status = '';
  
  if (!form.title.trim()) {
    errors.title = 'Title is required';
    isValid = false;
  } else if (form.title.length > 255) {
    errors.title = 'Title must be less than 255 characters';
    isValid = false;
  }
  
  if (!['pending', 'completed'].includes(form.status)) {
    errors.status = 'Status must be either pending or completed';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    emit('submit', { ...form });
  }
};
</script>

<style>
.task-form-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.form-title {
  margin-top: 0;
  margin-bottom: 24px;
  color: #333333;
  font-size: 24px;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555555;
  font-size: 14px;
}

.form-control {
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.form-control.is-invalid {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.cancel-btn {
  background-color: #e0e0e0;
  color: #333333;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #d0d0d0;
}

.submit-btn {
  background-color: #2196f3;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .task-form-container {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn, .submit-btn {
    width: 100%;
  }
}
</style>