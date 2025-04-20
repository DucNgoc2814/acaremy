<template>
  <div class="md:hidden w-full">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="hidden sm:inline">Course Marketplace</span>
      </router-link>
      
      <!-- Mobile Menu Button -->
      <div class="flex items-center space-x-2">
        <!-- Cart Icon -->
        <router-link to="/cart" class="relative p-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartCount }}
          </span>
        </router-link>
        
        <!-- Menu Toggle Button -->
        <button @click="toggleMenu" class="p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu Modal -->
  <div v-if="isMenuOpen" class="fixed inset-0 z-50 overflow-hidden md:hidden">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" @click="toggleMenu"></div>
    
    <!-- Slide-in Menu Panel -->
    <div class="absolute inset-y-0 left-0 max-w-xs w-full bg-indigo-800 shadow-xl transform transition-transform duration-300 ease-in-out"
         :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'">
      
      <!-- Menu Header -->
      <div class="flex items-center justify-between p-4 border-b border-indigo-700 bg-indigo-900">
        <div class="text-white font-bold text-lg">Menu</div>
        <button @click="toggleMenu" class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Menu Links -->
      <div class="py-4 px-2 overflow-y-auto">
        <div class="flex flex-col space-y-1">
          <router-link to="/" @click="toggleMenu" class="px-3 py-3 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors mb-1" :class="{ 'bg-indigo-900': $route.path === '/' }">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Trang chủ
            </div>
          </router-link>
          <router-link to="/courses" @click="toggleMenu" class="px-3 py-3 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors mb-1" :class="{ 'bg-indigo-900': $route.path.includes('/courses') }">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Khóa học
            </div>
          </router-link>
          <router-link to="/products" @click="toggleMenu" class="px-3 py-3 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors mb-1" :class="{ 'bg-indigo-900': $route.path.includes('/products') }">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Sản phẩm
            </div>
          </router-link>
        
          <!-- User Info -->
          <div class="px-3 py-4 border-t border-indigo-700 mt-2 pt-2 bg-indigo-900 rounded-md mb-2">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-3 text-lg font-bold">
                {{ user.name.charAt(0) }}
              </div>
              <div>
                <div class="text-sm font-medium text-white">{{ user.name }}</div>
                <div class="text-xs text-indigo-200">{{ user.email }}</div>
              </div>
            </div>
          </div>
          
          <!-- Wallet Info -->
          <div class="px-4 py-3 flex justify-between items-center bg-indigo-700 rounded-md mb-3 mx-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <div class="text-sm font-medium text-white">Ví điện tử</div>
            </div>
            <div class="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold shadow">
              {{ formatCurrency(walletBalance) }}
            </div>
          </div>
          
          <!-- Actions -->
          <button @click="$emit('show-deposit'); toggleMenu()" class="w-full mb-2 px-4 py-3 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nạp tiền
          </button>
          <button @click="$emit('logout'); toggleMenu()" class="w-full px-4 py-3 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  walletBalance: Number,
  cartCount: Number,
  user: Object
});

defineEmits(['show-deposit', 'logout']);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<style scoped>
/* Add animation for slide-in menu */
.translate-x-0 {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
