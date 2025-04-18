<template>
  <Teleport to="body">
    <div 
      v-if="isVisible"
      class="fixed z-50 top-0 right-0 m-4 p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-500"
      :class="[
        toastClasses,
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
      ]"
    >
      <div class="flex items-center">
        <!-- Icon -->
        <div class="flex-shrink-0 mr-3">
          <svg v-if="type === 'success'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'error'" class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'warning'" class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'cart'" class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <svg v-else class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Content -->
        <div class="flex-1">
          <div v-if="title" class="font-medium text-sm">{{ title }}</div>
          <div class="text-sm">{{ message }}</div>
        </div>
        
        <!-- Close button -->
        <div class="ml-4 flex-shrink-0 flex">
          <button 
            @click="close" 
            class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div 
        v-if="showProgressBar" 
        class="absolute bottom-0 left-0 h-1 bg-white bg-opacity-40"
        :style="{ width: `${progress}%`, transition: 'width linear 100ms' }"
      ></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info', 'cart'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  showProgressBar: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const isVisible = ref(false);
const progress = ref(100);
let timer = null;
let progressTimer = null;

const toastClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border-l-4 border-green-400 text-green-800';
    case 'error':
      return 'bg-red-50 border-l-4 border-red-400 text-red-800';
    case 'warning':
      return 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800';
    case 'cart':
      return 'bg-blue-50 border-l-4 border-blue-400 text-blue-800';
    default:
      return 'bg-blue-50 border-l-4 border-blue-400 text-blue-800';
  }
});

const startTimer = () => {
  clearTimeout(timer);
  clearInterval(progressTimer);
  
  progress.value = 100;
  
  if (props.duration > 0) {
    // Set up the progress bar
    if (props.showProgressBar) {
      const intervalTime = 10;
      const steps = props.duration / intervalTime;
      const stepSize = 100 / steps;
      
      progressTimer = setInterval(() => {
        progress.value = Math.max(0, progress.value - stepSize);
        if (progress.value <= 0) {
          clearInterval(progressTimer);
        }
      }, intervalTime);
    }
    
    // Set up the close timer
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

const close = () => {
  isVisible.value = false;
  clearTimeout(timer);
  clearInterval(progressTimer);
  
  setTimeout(() => {
    emit('close');
  }, 500); // Wait for the fade out animation to complete
};

onMounted(() => {
  // Show with animation after mounting
  setTimeout(() => {
    isVisible.value = true;
    startTimer();
  }, 10);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  clearInterval(progressTimer);
});

// Restart timer when duration changes
watch(() => props.duration, startTimer);
</script>
