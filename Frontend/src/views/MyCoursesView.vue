<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Khóa học của tôi</h1>
      
      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button 
            @click="activeTab = 'all'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'all' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Tất cả khóa học
          </button>
          <button 
            @click="activeTab = 'inProgress'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'inProgress' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Đang học
          </button>
          <button 
            @click="activeTab = 'completed'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'completed' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Đã hoàn thành
          </button>
        </nav>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredCourses.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 class="text-xl font-medium text-gray-900 mb-2">Chưa có khóa học nào</h2>
        <p class="text-gray-600 mb-6">Bạn chưa đăng ký khóa học nào hoặc không có khóa học nào trong danh mục này.</p>
        <router-link to="/courses" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Khám phá khóa học
        </router-link>
      </div>
      
      <!-- Course List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in filteredCourses" :key="course.id" class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
          <!-- Course Image -->
          <div class="aspect-video bg-gray-100 relative">
            <img :src="course.image" :alt="course.title" class="w-full h-full object-cover">
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div class="flex items-center">
                <div class="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {{ course.category }}
                </div>
                <div v-if="course.progress === 100" class="ml-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Hoàn thành
                </div>
              </div>
            </div>
          </div>
          
          <!-- Course Content -->
          <div class="p-4">
            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">{{ course.title }}</h3>
            
            <!-- Progress Bar -->
            <div class="mt-2 mb-3">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Tiến độ</span>
                <span class="font-medium">{{ course.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-600 h-2 rounded-full" :style="`width: ${course.progress}%`"></div>
              </div>
            </div>
            
            <!-- Course Stats -->
            <div class="flex items-center justify-between text-sm text-gray-500 mt-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ course.duration }}
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                {{ course.lessons }} bài học
              </div>
            </div>
            
            <!-- Action Button -->
            <router-link :to="`/courses/${course.id}`" class="mt-4 block w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-medium text-center hover:bg-indigo-700 transition-colors">
              {{ course.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { placeholders } from '../assets/images/placeholder';

// Active tab state
const activeTab = ref('all');

// Mock enrolled courses data
const enrolledCourses = ref([
  {
    id: 1,
    title: 'Lập trình Laravel từ cơ bản đến nâng cao',
    description: 'Khóa học toàn diện về Laravel Framework',
    image: placeholders.laravel,
    category: 'Backend',
    instructor: 'Nguyễn Văn A',
    duration: '20 giờ',
    lessons: 42,
    progress: 75
  },
  {
    id: 2,
    title: 'Vue.js - Xây dựng ứng dụng SPA hiện đại',
    description: 'Học cách xây dựng ứng dụng Vue.js từ cơ bản đến nâng cao',
    image: placeholders.vuejs,
    category: 'Frontend',
    instructor: 'Trần Văn B',
    duration: '15 giờ',
    lessons: 36,
    progress: 100
  },
  {
    id: 3,
    title: 'TailwindCSS Masterclass',
    description: 'Thiết kế giao diện hiện đại với TailwindCSS',
    image: placeholders.tailwind,
    category: 'CSS',
    instructor: 'Lê Thị C',
    duration: '8 giờ',
    lessons: 24,
    progress: 30
  },
  {
    id: 4,
    title: 'API Development với Laravel',
    description: 'Xây dựng RESTful API với Laravel và Laravel Sanctum',
    image: placeholders.laravelApi,
    category: 'Backend',
    instructor: 'Nguyễn Văn A',
    duration: '12 giờ',
    lessons: 28,
    progress: 0
  }
]);

// Filter courses based on active tab
const filteredCourses = computed(() => {
  if (activeTab.value === 'all') {
    return enrolledCourses.value;
  } else if (activeTab.value === 'inProgress') {
    return enrolledCourses.value.filter(course => course.progress > 0 && course.progress < 100);
  } else if (activeTab.value === 'completed') {
    return enrolledCourses.value.filter(course => course.progress === 100);
  }
  return [];
});
</script>
