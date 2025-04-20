<template>
  <div class="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-200">
    <div class="relative">
      <div class="aspect-video bg-gray-100 overflow-hidden">
        <img :src="course.image" :alt="course.title" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500">
      </div>
      <div class="absolute top-1 right-1">
        <span class="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
          {{ course.level }}
        </span>
      </div>
    </div>
    
    <div class="p-2 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex items-start justify-between mb-1">
          <h3 class="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
            <router-link :to="`/courses/${course.slug}`">{{ course.title }}</router-link>
          </h3>
        </div>
        
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ course.duration }}
          </div>
          
          <!-- Sales count badge -->
          <div class="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {{ course.salesCount }} đã bán
          </div>
        </div>
        
        <p class="text-gray-600 text-xs mb-1.5 line-clamp-1">{{ course.description }}</p>
        
        <div class="flex flex-wrap gap-0.5 mb-1.5">
          <span v-for="topic in course.topics.slice(0, 1)" :key="topic" class="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            {{ topic }}
          </span>
          <span v-if="course.topics.length > 1" class="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
            +{{ course.topics.length - 1 }}
          </span>
        </div>
      </div>
      
      <div class="pt-1.5 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500">Giảng viên</p>
          <p class="text-xs font-medium text-gray-700 truncate max-w-[90px]">{{ course.instructor }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-indigo-600">{{ formatCurrency(course.price) }}</p>
        </div>
      </div>
      
      <!-- View Details Button -->
      <router-link 
        :to="`/courses/${course.slug}`" 
        class="mt-1.5 w-full py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm"
      >
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Xem chi tiết
        </span>
      </router-link>
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

// No emits needed for router-link

const isPurchased = computed(() => 
  props.purchasedIds.includes(props.course.id)
);

// No longer needed since we're using router-link

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
