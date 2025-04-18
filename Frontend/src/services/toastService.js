// Toast notification service
import { ref, reactive } from 'vue';

// Toast state
const toasts = reactive([]);

// Default options
const defaultOptions = {
  type: 'info',
  title: '',
  duration: 3000,
  showProgressBar: true
};

/**
 * Generate a simple unique ID
 * @returns {String} Unique ID
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Add a new toast notification
 * @param {Object} options - Toast options
 * @returns {String} Toast ID
 */
const addToast = (options) => {
  const id = generateId();
  const toast = {
    id,
    ...defaultOptions,
    ...options,
    message: options.message || 'Notification'
  };
  
  toasts.push(toast);
  return id;
};

/**
 * Remove a toast by ID
 * @param {String} id - Toast ID to remove
 */
const removeToast = (id) => {
  const index = toasts.findIndex(toast => toast.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
  }
};

/**
 * Show a success toast
 * @param {String} message - Toast message
 * @param {String} title - Optional title
 * @param {Object} options - Additional options
 * @returns {String} Toast ID
 */
const showSuccess = (message, title = 'Thành công', options = {}) => {
  return addToast({
    type: 'success',
    message,
    title,
    ...options
  });
};

/**
 * Show an error toast
 * @param {String} message - Toast message
 * @param {String} title - Optional title
 * @param {Object} options - Additional options
 * @returns {String} Toast ID
 */
const showError = (message, title = 'Lỗi', options = {}) => {
  return addToast({
    type: 'error',
    message,
    title,
    ...options
  });
};

/**
 * Show a warning toast
 * @param {String} message - Toast message
 * @param {String} title - Optional title
 * @param {Object} options - Additional options
 * @returns {String} Toast ID
 */
const showWarning = (message, title = 'Cảnh báo', options = {}) => {
  return addToast({
    type: 'warning',
    message,
    title,
    ...options
  });
};

/**
 * Show an info toast
 * @param {String} message - Toast message
 * @param {String} title - Optional title
 * @param {Object} options - Additional options
 * @returns {String} Toast ID
 */
const showInfo = (message, title = 'Thông báo', options = {}) => {
  return addToast({
    type: 'info',
    message,
    title,
    ...options
  });
};

/**
 * Show a cart notification toast
 * @param {String} message - Toast message
 * @param {String} title - Optional title
 * @param {Object} options - Additional options
 * @returns {String} Toast ID
 */
const showCartNotification = (message, title = 'Giỏ hàng', options = {}) => {
  return addToast({
    type: 'cart',
    message,
    title,
    ...options
  });
};

export default {
  toasts,
  addToast,
  removeToast,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showCartNotification
};
