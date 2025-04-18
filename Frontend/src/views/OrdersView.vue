<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Đơn hàng của tôi</h1>
      
      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button 
            @click="activeTab = 'all'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'all' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Tất cả đơn hàng
          </button>
          <button 
            @click="activeTab = 'completed'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'completed' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Đã hoàn thành
          </button>
          <button 
            @click="activeTab = 'pending'" 
            class="py-4 px-1 border-b-2 font-medium text-sm" 
            :class="activeTab === 'pending' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Đang xử lý
          </button>
        </nav>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 class="text-xl font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h2>
        <p class="text-gray-600 mb-6">Bạn chưa có đơn hàng nào hoặc không có đơn hàng nào trong danh mục này.</p>
        <router-link to="/products" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Mua sắm ngay
        </router-link>
      </div>
      
      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <!-- Order Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-sm text-gray-500">Mã đơn hàng: <span class="font-medium text-gray-900">{{ order.orderNumber }}</span></p>
                <p class="text-sm text-gray-500 mt-1">Ngày đặt: <span class="font-medium text-gray-900">{{ formatDate(order.date) }}</span></p>
              </div>
              
              <div class="flex items-center gap-4">
                <div>
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                    :class="{
                      'bg-green-100 text-green-800': order.status === 'completed',
                      'bg-yellow-100 text-yellow-800': order.status === 'processing',
                      'bg-blue-100 text-blue-800': order.status === 'pending'
                    }"
                  >
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
                
                <p class="text-sm font-medium text-gray-900">{{ formatCurrency(order.total) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Order Items -->
          <div class="px-6 py-4">
            <div v-for="(item, index) in order.items" :key="index" class="flex items-center py-4" :class="{ 'border-t border-gray-100': index > 0 }">
              <!-- Item Image -->
              <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center">
              </div>
              
              <!-- Item Details -->
              <div class="ml-4 flex-1">
                <div class="flex justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                    <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ formatCurrency(item.price) }}</p>
                </div>
                
                <div class="flex items-center justify-between mt-2">
                  <p class="text-xs text-gray-500">Số lượng: {{ item.quantity }}</p>
                  
                  <div v-if="item.type === 'course'">
                    <router-link :to="`/courses/${item.id}`" class="text-xs text-indigo-600 hover:text-indigo-800">
                      Xem khóa học
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-900">Tổng cộng</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(order.total) }}</span>
            </div>
            
            <div class="mt-4 flex justify-end">
              <button 
                v-if="order.status === 'completed'"
                class="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Xem hóa đơn
              </button>
            </div>
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

// Mock orders data
const orders = ref([
  {
    id: 1,
    orderNumber: 'ORD-2025-001',
    date: '2025-04-10T10:30:00Z',
    status: 'completed',
    total: 1500000,
    items: [
      {
        id: 1,
        name: 'Lập trình Laravel từ cơ bản đến nâng cao',
        category: 'Khóa học',
        price: 1200000,
        quantity: 1,
        image: placeholders.laravel,
        type: 'course'
      },
      {
        id: 2,
        name: 'Sách: Laravel Design Patterns',
        category: 'Sách điện tử',
        price: 300000,
        quantity: 1,
        image: placeholders.book,
        type: 'product'
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD-2025-002',
    date: '2025-04-15T14:20:00Z',
    status: 'processing',
    total: 850000,
    items: [
      {
        id: 3,
        name: 'Vue.js - Xây dựng ứng dụng SPA hiện đại',
        category: 'Khóa học',
        price: 850000,
        quantity: 1,
        image: placeholders.vuejs,
        type: 'course'
      }
    ]
  },
  {
    id: 3,
    orderNumber: 'ORD-2025-003',
    date: '2025-04-16T09:15:00Z',
    status: 'pending',
    total: 450000,
    items: [
      {
        id: 4,
        name: 'TailwindCSS Masterclass',
        category: 'Khóa học',
        price: 450000,
        quantity: 1,
        image: placeholders.tailwind,
        type: 'course'
      }
    ]
  }
]);

// Filter orders based on active tab
const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orders.value;
  } else {
    return orders.value.filter(order => order.status === activeTab.value);
  }
});

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Get status text in Vietnamese
function getStatusText(status) {
  const statusMap = {
    'completed': 'Đã hoàn thành',
    'processing': 'Đang xử lý',
    'pending': 'Chờ xác nhận'
  };
  
  return statusMap[status] || status;
}
</script>
