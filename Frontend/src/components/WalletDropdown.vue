<template>
  <div class="relative group">
    <button class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
      <span>Ví điện tử</span>
      <span class="ml-2 bg-yellow-400 text-indigo-900 px-2 py-0.5 rounded-full text-xs font-medium">
        {{ formatCurrency(walletBalance) }}
      </span>
    </button>
    
    <!-- Enhanced Wallet Dropdown -->
    <div class="absolute right-0 w-72 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
      <div class="p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-900">Ví của bạn</h3>
          <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Đang hoạt động</span>
        </div>
        
        <div class="mb-3">
          <p class="text-xs text-indigo-700 mb-1">Số dư hiện tại</p>
          <p class="text-lg font-bold text-indigo-600">{{ formatCurrency(walletBalance) }}</p>
        </div>
        
        <div class="mb-3">
          <h4 class="text-xs font-medium text-gray-700 mb-2">Giao dịch gần đây</h4>
          <div v-if="recentTransactions.length > 0" class="space-y-2">
            <div v-for="(transaction, index) in recentTransactions" :key="index" class="flex justify-between items-center text-xs">
              <div>
                <div class="font-medium" :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
                  {{ transaction.type === 'deposit' ? 'Nạp tiền' : 'Thanh toán' }}
                </div>
                <div class="text-gray-500">{{ formatDate(transaction.date) }}</div>
              </div>
              <div class="font-medium" :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.type === 'deposit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-gray-500 text-center py-2">
            Chưa có giao dịch nào
          </div>
        </div>
        
        <div class="flex space-x-2">
          <router-link to="/transactions" class="flex-1 block text-center px-3 py-2 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition-colors">
            Lịch sử giao dịch
          </router-link>
          <button @click="$emit('show-deposit')" class="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors">
            Nạp tiền
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  walletBalance: Number,
  recentTransactions: Array
});

defineEmits(['show-deposit']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>
