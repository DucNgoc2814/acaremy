<template>
  <div class="bg-white rounded-md overflow-hidden shadow-sm hover:shadow transition-all duration-300 h-full flex flex-col">
    <div class="relative">
      <div class="aspect-video bg-gray-100 overflow-hidden">
        <img :src="course.image" :alt="course.title" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500">
      </div>
      <div class="absolute top-1 right-1">
        <span class="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-medium">
          {{ course.level }}
        </span>
      </div>
    </div>
    
    <div class="p-2 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex items-start justify-between mb-1">
          <h3 class="text-xs font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
            <router-link :to="`/courses/${course.id}`">{{ course.title }}</router-link>
          </h3>
        </div>
        
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center text-[10px] text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ course.duration }}
          </div>
          
          <!-- Sales count badge -->
          <div class="flex items-center text-[10px] text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {{ course.salesCount }} đã bán
          </div>
        </div>
        
        <p class="text-gray-600 text-[10px] mb-1.5 line-clamp-1">{{ course.description }}</p>
        
        <div class="flex flex-wrap gap-0.5 mb-1.5">
          <span v-for="topic in course.topics.slice(0, 1)" :key="topic" class="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-medium">
            {{ topic }}
          </span>
          <span v-if="course.topics.length > 1" class="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded-full text-[10px] font-medium">
            +{{ course.topics.length - 1 }}
          </span>
        </div>
      </div>
      
      <div class="pt-1.5 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[10px] text-gray-500">Giảng viên</p>
          <p class="text-[10px] font-medium text-gray-700 truncate max-w-[70px]">{{ course.instructor }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-bold text-indigo-600">{{ formatCurrency(course.price) }}</p>
        </div>
      </div>
      
      <!-- Improved Buy Button -->
      <button 
        @click="$emit('buy-now', course)" 
        class="mt-1.5 w-full py-1.5 rounded-md text-[10px] font-medium transition-all duration-300 flex items-center justify-center"
        :class="isPurchased ? 
          'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm' : 
          'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-sm'"
        :disabled="isPurchased"
      >
        <span v-if="isPurchased" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Đã mua
        </span>
        <span v-else class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Mua ngay
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  purchasedIds: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['buy-now']);

const isPurchased = computed(() => 
  props.purchasedIds.includes(props.course.id)
);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<style>
/* Line clamp with cross-browser compatibility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-line-clamp: 1;
  -moz-box-orient: vertical;
  display: box;
  line-clamp: 1;
  box-orient: vertical;
}
</style>
