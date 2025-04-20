import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  // State
  const toasts = ref([]);
  
  // Actions
  function showToast({ type = 'info', message, title = '', duration = 3000 }) {
    const id = Date.now();
    
    toasts.value.push({
      id,
      type,
      message,
      title,
      duration
    });
    
    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }
  
  function removeToast(id) {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }
  
  // Shorthand methods
  function success(message, title = '', duration = 3000) {
    return showToast({ type: 'success', message, title, duration });
  }
  
  function error(message, title = '', duration = 3000) {
    return showToast({ type: 'error', message, title, duration });
  }
  
  function warning(message, title = '', duration = 3000) {
    return showToast({ type: 'warning', message, title, duration });
  }
  
  function info(message, title = '', duration = 3000) {
    return showToast({ type: 'info', message, title, duration });
  }
  
  function cartNotification(message = 'Đã thêm vào giỏ hàng', title = '', duration = 3000) {
    return showToast({ type: 'cart', message, title, duration });
  }
  
  function noteNotification(message = 'Đã lưu ghi chú', title = '', duration = 3000) {
    return showToast({ type: 'note', message, title, duration });
  }
  
  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info,
    cartNotification,
    noteNotification
  };
});
