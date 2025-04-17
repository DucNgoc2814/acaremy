<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-0">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-900">Xác nhận thanh toán</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
              <img :src="course.image" :alt="course.title" class="h-12 w-12 object-contain">
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ course.title }}</h4>
              <p class="text-sm text-gray-500">{{ course.instructor }}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-md p-4 mb-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Giá khóa học</span>
              <span class="font-medium">{{ formatCurrency(course.price) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2 mt-2">
              <div class="flex justify-between font-medium">
                <span>Tổng thanh toán</span>
                <span class="text-blue-600">{{ formatCurrency(course.price) }}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 rounded-md p-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-blue-700">Số dư ví</p>
                <p class="font-medium text-blue-800">{{ formatCurrency(walletBalance) }}</p>
              </div>
              <div v-if="isBalanceSufficient" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Đủ số dư
              </div>
              <div v-else class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Không đủ số dư
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3">
          <button @click="$emit('close')" class="btn btn-secondary">
            Hủy
          </button>
          <button 
            @click="$emit('confirm')" 
            class="btn btn-primary"
            :disabled="!isBalanceSufficient"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWalletStore } from '../stores/wallet';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'confirm']);

const walletStore = useWalletStore();
const walletBalance = computed(() => walletStore.balance);

const isBalanceSufficient = computed(() => {
  return walletBalance.value >= props.course.price;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>
