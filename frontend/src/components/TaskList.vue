<template>
  <div class="task-list-container">
    <div class="task-list-header">
      <h1 class="task-list-title">Task Management App</h1>
      <button class="btn create-btn" @click="showCreateForm = true" v-if="!showCreateForm && !showEditForm">
        Create New Task
      </button>
    </div>
    
    <div class="filter-bar">
      <span class="filter-label">Filter by status:</span>
      <div class="filter-options">
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'all' }" 
          @click="setFilter('all')"
        >
          All
        </button>
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'pending' }" 
          @click="setFilter('pending')"
        >
          Pending
        </button>
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'completed' }" 
          @click="setFilter('completed')"
        >
          Completed
        </button>
      </div>
    </div>
    
    <task-form 
      v-if="showCreateForm" 
      @submit="createTask" 
      @cancel="showCreateForm = false"
    />
    
    <task-form 
      v-if="showEditForm" 
      :task="currentTask" 
      :is-editing="true" 
      @submit="updateTask" 
      @cancel="showEditForm = false"
    />
    
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading tasks...</p>
    </div>
    
    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <p>No tasks found. Create a new task to get started!</p>
    </div>
    
    <div v-else class="task-list">
      <task-item 
        v-for="task in filteredTasks" 
        :key="task.id" 
        :task="task"
        @edit="editTask"
        @delete="confirmDeleteTask"
        @toggle-status="updateTaskStatus"
      />
    </div>
    
    <div class="pagination" v-if="totalPages > 1">
      <button 
        class="pagination-btn" 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      
      <button 
        class="pagination-btn" 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
    
    <div v-if="showDeleteConfirm" class="delete-modal">
      <div class="delete-modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this task?</p>
        <div class="delete-modal-actions">
          <button class="btn cancel-btn" @click="showDeleteConfirm = false">Cancel</button>
          <button class="btn delete-btn" @click="deleteTask">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

const tasks = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);
const currentFilter = ref('all');
const showCreateForm = ref(false);
const showEditForm = ref(false);
const currentTask = ref(null);
const showDeleteConfirm = ref(false);
const taskToDelete = ref(null);

// API base URL
const apiBaseUrl = 'http://localhost:8000/api';

// Fetch tasks from API
const fetchTasks = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${apiBaseUrl}/tasks`, {
      params: {
        page: currentPage.value,
        per_page: perPage.value,
        status: currentFilter.value !== 'all' ? currentFilter.value : undefined
      }
    });
    
    tasks.value = response.data.data;
    totalPages.value = response.data.meta.last_page;
    currentPage.value = response.data.meta.current_page;
    
  } catch (err) {
    error.value = 'Failed to load tasks. Please try again.';
    console.error('Error fetching tasks:', err);
  } finally {
    loading.value = false;
  }
};

// Computed property for filtered tasks
const filteredTasks = computed(() => {
  if (currentFilter.value === 'all') {
    return tasks.value;
  }
  return tasks.value.filter(task => task.status === currentFilter.value);
});

// Set filter and reset to page 1
const setFilter = (filter) => {
  currentFilter.value = filter;
  currentPage.value = 1;
  fetchTasks();
};

// Change page
const changePage = (page) => {
  currentPage.value = page;
  fetchTasks();
};

// Create a new task
const createTask = async (task) => {
  loading.value = true;
  try {
    await axios.post(`${apiBaseUrl}/tasks`, task,
    );
    
    showCreateForm.value = false;
    fetchTasks();
  } catch (err) {
    error.value = 'Failed to create task. Please try again.';
    console.error('Error creating task:', err);
  } finally {
    loading.value = false;
  }
};

// Edit task
const editTask = (task) => {
  currentTask.value = { ...task };
  showEditForm.value = true;
  showCreateForm.value = false;
};

// Update task
const updateTask = async (task) => {
  loading.value = true;
  try {
    await axios.put(`${apiBaseUrl}/tasks/${task.id}`, task);
    showEditForm.value = false;
    fetchTasks();
  } catch (err) {
    error.value = 'Failed to update task. Please try again.';
    console.error('Error updating task:', err);
  } finally {
    loading.value = false;
  }
};

// Update task status
const updateTaskStatus = async (task) => {
  loading.value = true;
  try {
    await axios.put(`${apiBaseUrl}/tasks/${task.id}`, {
      status: task.status
    });
    fetchTasks();
  } catch (err) {
    error.value = 'Failed to update task status. Please try again.';
    console.error('Error updating task status:', err);
  } finally {
    loading.value = false;
  }
};

// Confirm delete task
const confirmDeleteTask = (id) => {
  taskToDelete.value = id;
  showDeleteConfirm.value = true;
};

// Delete task
const deleteTask = async () => {
  if (!taskToDelete.value) return;
  
  loading.value = true;
  try {
    await axios.delete(`${apiBaseUrl}/tasks/${taskToDelete.value}`);
    showDeleteConfirm.value = false;
    fetchTasks();
  } catch (err) {
    error.value = 'Failed to delete task. Please try again.';
    console.error('Error deleting task:', err);
  } finally {
    loading.value = false;
  }
};

// Fetch tasks on component mount
onMounted(() => {
  fetchTasks();
});
watch(currentFilter, () => {
  fetchTasks();
});
</script>

<style>
.task-list-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Roboto', 'Open Sans', sans-serif;
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.task-list-title {
  margin: 0;
  color: #333333;
  font-size: 28px;
}

.create-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.create-btn:hover {
  background-color: #388e3c;
}

.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
}

.filter-label {
  margin-right: 16px;
  font-weight: 600;
  color: #555555;
}

.filter-options {
  display: flex;
  gap: 8px;
}

.filter-btn {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}

.filter-btn:hover:not(.active) {
  background-color: #f0f0f0;
}

.task-list {
  margin-bottom: 24px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination-btn {
  background-color: #f5f5f5;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666666;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #2196f3;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 48px 0;
  color: #666666;
}

.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.delete-modal-content h3 {
  margin-top: 0;
  color: #333333;
}

.delete-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .task-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .filter-options {
    width: 100%;
  }
  
  .filter-btn {
    flex: 1;
    text-align: center;
  }
}
</style>

