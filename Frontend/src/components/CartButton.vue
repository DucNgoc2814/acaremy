<template>
  <router-link to="/cart" class="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    <span class="hidden md:inline">Giỏ hàng</span>
    <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {{ cartCount }}
    </span>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
});
</script>
