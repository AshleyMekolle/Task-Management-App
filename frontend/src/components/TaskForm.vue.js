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
    }
    else if (form.title.length > 255) {
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
        emit('submit', Object.assign({}, form));
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "task-form-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "form-title" }));
(__VLS_ctx.isEditing ? 'Edit Task' : 'Create New Task');
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(Object.assign({ onSubmit: (__VLS_ctx.submitForm) }, { class: "task-form" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "form-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "title",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(Object.assign(Object.assign({ type: "text", id: "title", value: (__VLS_ctx.form.title) }, { class: "form-control" }), { class: ({ 'is-invalid': __VLS_ctx.errors.title }) }));
if (__VLS_ctx.errors.title) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "error-message" }));
    (__VLS_ctx.errors.title);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "form-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "description",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(Object.assign(Object.assign({ id: "description", value: (__VLS_ctx.form.description) }, { class: "form-control" }), { rows: "4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "form-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "status",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(Object.assign(Object.assign({ id: "status", value: (__VLS_ctx.form.status) }, { class: "form-control" }), { class: ({ 'is-invalid': __VLS_ctx.errors.status }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "pending",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "completed",
});
if (__VLS_ctx.errors.status) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "error-message" }));
    (__VLS_ctx.errors.status);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "form-actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.$emit('cancel');
    } }, { type: "button" }), { class: "btn cancel-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ type: "submit" }, { class: "btn submit-btn" }));
(__VLS_ctx.isEditing ? 'Update Task' : 'Create Task');
/** @type {__VLS_StyleScopedClasses['task-form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-title']} */ ;
/** @type {__VLS_StyleScopedClasses['task-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['is-invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['is-invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emit, form: form, errors: errors, submitForm: submitForm });
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emit });
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TaskForm.vue.js.map