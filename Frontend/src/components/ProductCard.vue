<template>
  <div class="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-200">
    <div class="relative">
      <div class="aspect-video bg-gray-100 overflow-hidden">
        <img :src="product.image" :alt="product.title" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500">
      </div>
      <div class="absolute top-1 right-1">
        <span class="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {{ product.category }}
        </span>
      </div>
      <div v-if="product.featured" class="absolute top-1 left-1">
        <span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
          Nổi bật
        </span>
      </div>
      <!-- Discount Badge -->
      <div v-if="product.discountPercent > 0" class="absolute bottom-1 left-1">
        <span class="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold">
          -{{ product.discountPercent }}%
        </span>
      </div>
    </div>
    
    <div class="p-2 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex items-start justify-between mb-1">
          <h3 class="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            <router-link :to="`/products/${product.id}`">{{ product.title }}</router-link>
          </h3>
        </div>
        
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ product.inStock ? 'Còn hàng' : 'Hết hàng' }}
          </div>
          
          <!-- Sales count badge -->
          <div class="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {{ product.salesCount }} đã bán
          </div>
        </div>
        
        <p class="text-gray-600 text-xs mb-1.5 line-clamp-2">{{ product.description }}</p>
      </div>
      
      <div class="pt-1.5 border-t border-gray-100 flex items-center justify-between">
        <div class="text-right w-full">
          <!-- Price with discount -->
          <div v-if="product.discountPercent > 0" class="flex items-center justify-end">
            <p class="text-xs text-gray-500 line-through mr-1">{{ formatCurrency(product.price) }}</p>
            <p class="text-sm font-bold text-red-600">{{ formatCurrency(product.discountedPrice) }}</p>
          </div>
          <!-- Regular price -->
          <div v-else>
            <p class="text-sm font-bold text-blue-600">{{ formatCurrency(product.price) }}</p>
          </div>
        </div>
      </div>
      
      <!-- View Details Button -->
      <div class="flex gap-2 mt-1.5">
        <router-link 
          :to="`/products/${product.id}`" 
          class="flex-1 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm"
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
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

// Handle add to cart button click
function handleAddToCart() {
  emit('add-to-cart', props.product);
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  display: box;
  line-clamp: 2;
  box-orient: vertical;
}
</style>
