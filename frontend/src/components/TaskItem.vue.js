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
    emit('toggle-status', Object.assign(Object.assign({}, props.task), { status: newStatus }));
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-item" }, { class: ({ 'task-completed': __VLS_ctx.task.status === 'completed' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(Object.assign({ class: "task-title" }));
(__VLS_ctx.task.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "task-description" }));
(__VLS_ctx.task.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "task-status" }, { class: (__VLS_ctx.task.status) }));
(__VLS_ctx.task.status.charAt(0).toUpperCase() + __VLS_ctx.task.status.slice(1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.toggleStatus) }, { class: "btn toggle-btn" }));
(__VLS_ctx.task.status === 'pending' ? 'Complete' : 'Mark as Pending');
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.$emit('edit', __VLS_ctx.task);
    } }, { class: "btn edit-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.$emit('delete', __VLS_ctx.task.id);
    } }, { class: "btn delete-btn" }));
/** @type {__VLS_StyleScopedClasses['task-item']} */ ;
/** @type {__VLS_StyleScopedClasses['task-completed']} */ ;
/** @type {__VLS_StyleScopedClasses['task-content']} */ ;
/** @type {__VLS_StyleScopedClasses['task-title']} */ ;
/** @type {__VLS_StyleScopedClasses['task-description']} */ ;
/** @type {__VLS_StyleScopedClasses['task-status']} */ ;
/** @type {__VLS_StyleScopedClasses['task-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emit, toggleStatus: toggleStatus });
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emit });
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TaskItem.vue.js.map