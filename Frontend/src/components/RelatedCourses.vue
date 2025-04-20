<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <div v-if="showNavigation" class="hidden md:flex space-x-2">
        <button @click="scrollCourses('left')" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="scrollCourses('right')" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div class="relative">
      <div ref="coursesContainer" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CourseCard 
          v-for="course in courses" 
          :key="course.id" 
          :course="course" 
          variant="simple"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CourseCard from './CourseCard.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Khóa học liên quan'
  },
  courses: {
    type: Array,
    required: true
  },
  showNavigation: {
    type: Boolean,
    default: true
  },
  maxItems: {
    type: Number,
    default: 6
  }
});

const coursesContainer = ref(null);

const scrollCourses = (direction) => {
  if (!coursesContainer.value) return;
  
  const container = coursesContainer.value;
  const scrollAmount = 340; // Khoảng cách cuộn mỗi lần nhấp nút
  
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};
</script>
