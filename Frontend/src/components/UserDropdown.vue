<template>
  <div class="relative group">
    <button class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span>{{ user.name }}</span>
    </button>
    
    <!-- User Dropdown Menu -->
    <div class="absolute right-0 w-64 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
      <div class="p-4 border-b border-gray-100">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-3">
            {{ user.name.charAt(0) }}
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">{{ user.name }}</h3>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
        </div>
      </div>
      
      <div class="py-2">
        <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Thông tin tài khoản
        </router-link>
        
        <router-link to="/my-courses" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Khóa học của tôi
        </router-link>
        
        <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Đơn hàng của tôi
        </router-link>
        
        <div class="border-t border-gray-100 my-1"></div>
        
        <button @click="$emit('logout')" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  user: Object
});

defineEmits(['logout']);
</script>
