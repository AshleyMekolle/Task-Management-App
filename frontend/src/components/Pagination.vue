<template>
  <div class="pagination-container">
    <!-- Mobile Buttons -->
    <div class="mobile-buttons">
      <button
        @click="onPageChange(pagination.currentPage - 1)"
        :disabled="pagination.currentPage === 1"
        class="mobile-button"
      >
        Previous
      </button>
      <button
        @click="onPageChange(pagination.currentPage + 1)"
        :disabled="pagination.currentPage === pagination.lastPage"
        class="mobile-button"
      >
        Next
      </button>
    </div>

    <!-- Desktop Pagination -->
    <div class="desktop-pagination">
      <div>
        <p class="pagination-text">
          Showing
          <span class="font-medium">{{ (pagination.currentPage - 1) * pagination.perPage + 1 }}</span>
          to
          <span class="font-medium">
            {{ Math.min(pagination.currentPage * pagination.perPage, pagination.total) }}
          </span>
          of
          <span class="font-medium">{{ pagination.total }}</span>
          results
        </p>
      </div>
      <div v-if="pagination.lastPage > 1">
        <nav class="pagination-nav">
          <button
            @click="onPageChange(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            class="pagination-button arrow"
          >
            &larr;
          </button>
          
          <template v-for="page in displayedPages" :key="page">
            <button
              v-if="page !== '...'"
              @click="onPageChange(Number(page))"
              :class="[
                'pagination-button',
                Number(page) === pagination.currentPage ? 'active' : ''
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="pagination-button ellipsis"
            >
              ...
            </span>
          </template>
          
          <button
            @click="onPageChange(pagination.currentPage + 1)"
            :disabled="pagination.currentPage === pagination.lastPage"
            class="pagination-button arrow"
          >
            &rarr;
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pagination: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const onPageChange = (page: number) => {
  if (page >= 1 && page <= props.pagination.lastPage) {
    emit('page-change', page)
  }
}

const displayedPages = computed(() => {
  const { currentPage, lastPage } = props.pagination
  const pages: (number | string)[] = []
  
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
   
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(lastPage - 1, currentPage + 1)

    if (currentPage <= 3) {
      endPage = 4
    }
    
    if (currentPage >= lastPage - 2) {
      startPage = lastPage - 3
    }
    
    if (startPage > 2) {
      pages.push('...')
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < lastPage - 1) {
      pages.push('...')
    }
    
    pages.push(lastPage)
  }
  
  return pages
})
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb; 
  background-color: #ffffff; 
  padding: 0.75rem 1rem; 
}

/* Mobile Buttons */
.mobile-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mobile-button {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500; 
  color: #374151; 
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mobile-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mobile-button:not(:disabled):hover {
  background-color: #f9fafb;
}

/* Desktop Pagination */
.desktop-pagination {
  display: none; 
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

@media (min-width: 640px) {
  .mobile-buttons {
    display: none;
  }

  .desktop-pagination {
    display: flex; 
  }
}

/* Pagination Text */
.pagination-text {
  font-size: 0.875rem;
  color: #374151; 
}

.pagination-text .font-medium {
  font-weight: 500; 
}

/* Pagination Navigation */
.pagination-nav {
  display: inline-flex;
  align-items: center;
  border-radius: 0.375rem; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.pagination-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem; 
  font-size: 0.875rem; 
  font-weight: 600; 
  color: #111827; 
  border: 1px solid #d1d5db; 
  background-color: #ffffff; 
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination-button:disabled {
  opacity: 0.5; 
  cursor: not-allowed; 
}

.pagination-button:not(:disabled):hover {
  background-color: #f9fafb; 
}

.pagination-button.active {
  background-color: #2563eb; 
  color: #ffffff; 
  border-color: #2563eb; 
}

.pagination-button.ellipsis {
  color: #374151; 
  cursor: default;
}

.pagination-button.arrow {
  color: #9ca3af; 
  padding: 0.5rem;
}

.pagination-button.arrow:not(:disabled):hover {
  background-color: #f9fafb; 
}
</style>