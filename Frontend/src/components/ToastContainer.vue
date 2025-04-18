<template>
  <div class="fixed top-0 right-0 z-50 p-4 max-w-md w-full pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-4">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto w-full"
      >
        <ToastNotification
          :type="toast.type"
          :title="toast.title"
          :message="toast.message"
          :duration="toast.duration"
          :show-progress-bar="toast.showProgressBar"
          @close="removeToast(toast.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ToastNotification from './ToastNotification.vue';
import toastService from '../services/toastService';

const toasts = toastService.toasts;
const removeToast = toastService.removeToast;
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
