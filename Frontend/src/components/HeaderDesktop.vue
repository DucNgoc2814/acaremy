<template>
  <div class="hidden md:flex items-center justify-between w-full">
    <!-- Logo and Navigation Links -->
    <div class="flex items-center space-x-1">
      <router-link to="/" class="text-xl font-bold text-white flex items-center mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Course Marketplace
      </router-link>
      
      <!-- Desktop Navigation - Left Side Menu -->
      <div class="flex items-center space-x-1">
        <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors" :class="{ 'bg-indigo-800': $route.path === '/' }">
          Trang chủ
        </router-link>
        <router-link to="/courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors" :class="{ 'bg-indigo-800': $route.path.includes('/courses') }">
          Khóa học
        </router-link>
        <router-link to="/products" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors" :class="{ 'bg-indigo-800': $route.path.includes('/products') }">
          Sản phẩm
        </router-link>
      </div>
    </div>
    
    <!-- Right Side - User & Wallet Info -->
    <div class="flex items-center space-x-2">
      <CartButton />
      <WalletDropdown :wallet-balance="walletBalance" :recent-transactions="recentTransactions" @show-deposit="$emit('show-deposit')" />
      <UserDropdown :user="user" @logout="$emit('logout')" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import CartButton from './CartButton.vue';
import WalletDropdown from './WalletDropdown.vue';
import UserDropdown from './UserDropdown.vue';

defineProps({
  walletBalance: Number,
  recentTransactions: Array,
  user: Object
});

defineEmits(['show-deposit', 'logout']);
</script>
