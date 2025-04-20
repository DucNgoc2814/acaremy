<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="relative">
      <img :src="course.image" :alt="course.title" class="w-full h-36 object-cover">
      <div class="absolute top-2 left-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {{ course.level }}
      </div>
    </div>
    <div class="p-3">
      <h3 class="font-bold text-base mb-1 text-gray-900 line-clamp-1">{{ course.title }}</h3>
      <div class="flex items-center text-xs text-gray-500 mb-2">
        <span class="inline-flex items-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ course.duration }}
        </span>
        <span class="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {{ course.salesCount || Math.floor(Math.random() * 100) }} học viên
        </span>
      </div>
      <div class="flex items-center justify-between text-xs text-gray-500">
        <div>
          Giảng viên <span class="font-medium">{{ course.instructor }}</span>
        </div>
        <div>
          <span v-if="course.topics && course.topics.length > 0" class="text-blue-600 font-medium">+{{ course.topics.length }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <p class="text-base font-bold text-blue-600">{{ formatCurrency(course.price) }}</p>
        <button @click="handleViewDetail" class="text-center py-1 px-3 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors font-medium">
          Xem chi tiết
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

const handleViewDetail = () => {
  router.push(`/courses/${props.course.slug}`);
};
</script>
