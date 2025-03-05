import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
const onPageChange = (page) => {
    if (page >= 1 && page <= props.pagination.lastPage) {
        emit('page-change', page);
    }
};
const displayedPages = computed(() => {
    const { currentPage, lastPage } = props.pagination;
    const pages = [];
    if (lastPage <= 7) {
        for (let i = 1; i <= lastPage; i++) {
            pages.push(i);
        }
    }
    else {
        pages.push(1);
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(lastPage - 1, currentPage + 1);
        if (currentPage <= 3) {
            endPage = 4;
        }
        if (currentPage >= lastPage - 2) {
            startPage = lastPage - 3;
        }
        if (startPage > 2) {
            pages.push('...');
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < lastPage - 1) {
            pages.push('...');
        }
        pages.push(lastPage);
    }
    return pages;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['mobile-button']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-button']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-text']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "pagination-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mobile-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.onPageChange(__VLS_ctx.pagination.currentPage - 1);
    } }, { disabled: (__VLS_ctx.pagination.currentPage === 1) }), { class: "mobile-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.onPageChange(__VLS_ctx.pagination.currentPage + 1);
    } }, { disabled: (__VLS_ctx.pagination.currentPage === __VLS_ctx.pagination.lastPage) }), { class: "mobile-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "desktop-pagination" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "pagination-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "font-medium" }));
((__VLS_ctx.pagination.currentPage - 1) * __VLS_ctx.pagination.perPage + 1);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "font-medium" }));
(Math.min(__VLS_ctx.pagination.currentPage * __VLS_ctx.pagination.perPage, __VLS_ctx.pagination.total));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "font-medium" }));
(__VLS_ctx.pagination.total);
if (__VLS_ctx.pagination.lastPage > 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(Object.assign({ class: "pagination-nav" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
            if (!(__VLS_ctx.pagination.lastPage > 1))
                return;
            __VLS_ctx.onPageChange(__VLS_ctx.pagination.currentPage - 1);
        } }, { disabled: (__VLS_ctx.pagination.currentPage === 1) }), { class: "pagination-button arrow" }));
    for (const [page] of __VLS_getVForSourceType((__VLS_ctx.displayedPages))) {
        (page);
        if (page !== '...') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.pagination.lastPage > 1))
                        return;
                    if (!(page !== '...'))
                        return;
                    __VLS_ctx.onPageChange(Number(page));
                } }, { class: ([
                    'pagination-button',
                    Number(page) === __VLS_ctx.pagination.currentPage ? 'active' : ''
                ]) }));
            (page);
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "pagination-button ellipsis" }));
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (...[$event]) => {
            if (!(__VLS_ctx.pagination.lastPage > 1))
                return;
            __VLS_ctx.onPageChange(__VLS_ctx.pagination.currentPage + 1);
        } }, { disabled: (__VLS_ctx.pagination.currentPage === __VLS_ctx.pagination.lastPage) }), { class: "pagination-button arrow" }));
}
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-button']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-button']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-text']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ellipsis']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            onPageChange: onPageChange,
            displayedPages: displayedPages,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Pagination.vue.js.map