import { __awaiter } from "tslib";
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
const fetchTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    loading.value = true;
    try {
        const response = yield axios.get(`${apiBaseUrl}/tasks`, {
            params: {
                page: currentPage.value,
                per_page: perPage.value,
                status: currentFilter.value !== 'all' ? currentFilter.value : undefined
            }
        });
        tasks.value = response.data.data;
        totalPages.value = response.data.meta.last_page;
        currentPage.value = response.data.meta.current_page;
    }
    catch (err) {
        error.value = 'Failed to load tasks. Please try again.';
        console.error('Error fetching tasks:', err);
    }
    finally {
        loading.value = false;
    }
});
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
const createTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    loading.value = true;
    try {
        yield axios.post(`${apiBaseUrl}/tasks`, task);
        showCreateForm.value = false;
        fetchTasks();
    }
    catch (err) {
        error.value = 'Failed to create task. Please try again.';
        console.error('Error creating task:', err);
    }
    finally {
        loading.value = false;
    }
});
// Edit task
const editTask = (task) => {
    currentTask.value = Object.assign({}, task);
    showEditForm.value = true;
    showCreateForm.value = false;
};
// Update task
const updateTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    loading.value = true;
    try {
        yield axios.put(`${apiBaseUrl}/tasks/${task.id}`, task);
        showEditForm.value = false;
        fetchTasks();
    }
    catch (err) {
        error.value = 'Failed to update task. Please try again.';
        console.error('Error updating task:', err);
    }
    finally {
        loading.value = false;
    }
});
// Update task status
const updateTaskStatus = (task) => __awaiter(void 0, void 0, void 0, function* () {
    loading.value = true;
    try {
        yield axios.put(`${apiBaseUrl}/tasks/${task.id}`, {
            status: task.status
        });
        fetchTasks();
    }
    catch (err) {
        error.value = 'Failed to update task status. Please try again.';
        console.error('Error updating task status:', err);
    }
    finally {
        loading.value = false;
    }
});
// Confirm delete task
const confirmDeleteTask = (id) => {
    taskToDelete.value = id;
    showDeleteConfirm.value = true;
};
// Delete task
const deleteTask = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskToDelete.value)
        return;
    loading.value = true;
    try {
        yield axios.delete(`${apiBaseUrl}/tasks/${taskToDelete.value}`);
        showDeleteConfirm.value = false;
        fetchTasks();
    }
    catch (err) {
        error.value = 'Failed to delete task. Please try again.';
        console.error('Error deleting task:', err);
    }
    finally {
        loading.value = false;
    }
});
// Fetch tasks on component mount
onMounted(() => {
    fetchTasks();
});
watch(currentFilter, () => {
    fetchTasks();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-list-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-list-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(Object.assign({ class: "task-list-title" }));
if (!__VLS_ctx.showCreateForm && !__VLS_ctx.showEditForm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
            if (!(!__VLS_ctx.showCreateForm && !__VLS_ctx.showEditForm))
                return;
            __VLS_ctx.showCreateForm = true;
        } }, { class: "btn create-btn" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "filter-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "filter-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "filter-options" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.setFilter('all');
    } }, { class: "filter-btn" }), { class: ({ active: __VLS_ctx.currentFilter === 'all' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.setFilter('pending');
    } }, { class: "filter-btn" }), { class: ({ active: __VLS_ctx.currentFilter === 'pending' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.setFilter('completed');
    } }, { class: "filter-btn" }), { class: ({ active: __VLS_ctx.currentFilter === 'completed' }) }));
if (__VLS_ctx.showCreateForm) {
    /** @type {[typeof TaskForm, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TaskForm, new TaskForm(Object.assign({ 'onSubmit': {} }, { 'onCancel': {} })));
    const __VLS_1 = __VLS_0(Object.assign({ 'onSubmit': {} }, { 'onCancel': {} }), ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onSubmit: (__VLS_ctx.createTask)
    };
    const __VLS_7 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.showCreateForm))
                return;
            __VLS_ctx.showCreateForm = false;
        }
    };
    var __VLS_2;
}
if (__VLS_ctx.showEditForm) {
    /** @type {[typeof TaskForm, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(TaskForm, new TaskForm(Object.assign(Object.assign({ 'onSubmit': {} }, { 'onCancel': {} }), { task: (__VLS_ctx.currentTask), isEditing: (true) })));
    const __VLS_9 = __VLS_8(Object.assign(Object.assign({ 'onSubmit': {} }, { 'onCancel': {} }), { task: (__VLS_ctx.currentTask), isEditing: (true) }), ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    let __VLS_13;
    const __VLS_14 = {
        onSubmit: (__VLS_ctx.updateTask)
    };
    const __VLS_15 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.showEditForm))
                return;
            __VLS_ctx.showEditForm = false;
        }
    };
    var __VLS_10;
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "loading-spinner" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "spinner" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else if (__VLS_ctx.filteredTasks.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "empty-state" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-list" }));
    for (const [task] of __VLS_getVForSourceType((__VLS_ctx.filteredTasks))) {
        /** @type {[typeof TaskItem, ]} */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(TaskItem, new TaskItem(Object.assign(Object.assign(Object.assign({ 'onEdit': {} }, { 'onDelete': {} }), { 'onToggleStatus': {} }), { key: (task.id), task: (task) })));
        const __VLS_17 = __VLS_16(Object.assign(Object.assign(Object.assign({ 'onEdit': {} }, { 'onDelete': {} }), { 'onToggleStatus': {} }), { key: (task.id), task: (task) }), ...__VLS_functionalComponentArgsRest(__VLS_16));
        let __VLS_19;
        let __VLS_20;
        let __VLS_21;
        const __VLS_22 = {
            onEdit: (__VLS_ctx.editTask)
        };
        const __VLS_23 = {
            onDelete: (__VLS_ctx.confirmDeleteTask)
        };
        const __VLS_24 = {
            onToggleStatus: (__VLS_ctx.updateTaskStatus)
        };
        var __VLS_18;
    }
}
if (__VLS_ctx.totalPages > 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "pagination" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
            if (!(__VLS_ctx.totalPages > 1))
                return;
            __VLS_ctx.changePage(__VLS_ctx.currentPage - 1);
        } }, { class: "pagination-btn" }), { disabled: (__VLS_ctx.currentPage === 1) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "page-info" }));
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
            if (!(__VLS_ctx.totalPages > 1))
                return;
            __VLS_ctx.changePage(__VLS_ctx.currentPage + 1);
        } }, { class: "pagination-btn" }), { disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages) }));
}
if (__VLS_ctx.showDeleteConfirm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "delete-modal" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "delete-modal-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "delete-modal-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
            if (!(__VLS_ctx.showDeleteConfirm))
                return;
            __VLS_ctx.showDeleteConfirm = false;
        } }, { class: "btn cancel-btn" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.deleteTask) }, { class: "btn delete-btn" }));
}
/** @type {__VLS_StyleScopedClasses['task-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-header']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['create-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-info']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TaskItem: TaskItem,
            TaskForm: TaskForm,
            loading: loading,
            currentPage: currentPage,
            totalPages: totalPages,
            currentFilter: currentFilter,
            showCreateForm: showCreateForm,
            showEditForm: showEditForm,
            currentTask: currentTask,
            showDeleteConfirm: showDeleteConfirm,
            filteredTasks: filteredTasks,
            setFilter: setFilter,
            changePage: changePage,
            createTask: createTask,
            editTask: editTask,
            updateTask: updateTask,
            updateTaskStatus: updateTaskStatus,
            confirmDeleteTask: confirmDeleteTask,
            deleteTask: deleteTask,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TaskList.vue.js.map