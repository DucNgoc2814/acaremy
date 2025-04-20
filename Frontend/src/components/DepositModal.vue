<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-gray-900">Nạp tiền vào ví</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
          <input 
            type="number" 
            id="amount" 
            v-model="amount" 
            min="10000"
            step="10000"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex justify-end gap-3">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            Hủy
          </button>
          <button @click="handleDeposit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'deposit']);

const amount = ref(100000);

const handleDeposit = () => {
  if (amount.value < 10000) {
    alert('Số tiền nạp tối thiểu là 10,000 VND');
    return;
  }
  
  emit('deposit', amount.value);
  amount.value = 100000; // Reset amount
};
</script>
