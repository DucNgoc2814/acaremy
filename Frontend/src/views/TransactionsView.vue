<template>
  <div class="py-8">
    <div class="container">
      <h1 class="text-3xl font-bold mb-8">Lịch sử giao dịch</h1>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 class="text-lg font-medium text-gray-900">Số dư ví</h2>
              <p class="text-3xl font-bold text-blue-600">{{ formatCurrency(walletBalance) }}</p>
            </div>
            
            <div class="flex gap-2">
              <button @click="showDepositModal = true" class="btn btn-primary">
                Nạp tiền
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-4">
          <button 
            @click="activeFilter = 'all'" 
            class="px-4 py-2 rounded-md font-medium"
            :class="activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
          >
            Tất cả
          </button>
          <button 
            @click="activeFilter = 'deposit'" 
            class="px-4 py-2 rounded-md font-medium"
            :class="activeFilter === 'deposit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
          >
            Nạp tiền
          </button>
          <button 
            @click="activeFilter = 'purchase'" 
            class="px-4 py-2 rounded-md font-medium"
            :class="activeFilter === 'purchase' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
          >
            Mua khóa học
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                  Không có giao dịch nào
                </td>
              </tr>
              <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                  >
                    {{ transaction.type === 'deposit' ? 'Nạp tiền' : 'Mua khóa học' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ transaction.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium" :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
                  {{ transaction.type === 'deposit' ? '+' : '-' }} {{ formatCurrency(transaction.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Deposit Modal -->
    <div v-if="showDepositModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-900">Nạp tiền vào ví</h3>
            <button @click="showDepositModal = false" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
            <input 
              type="number" 
              id="amount" 
              v-model="depositAmount" 
              min="10000"
              step="10000"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div class="flex justify-end gap-3">
            <button @click="showDepositModal = false" class="btn btn-secondary">
              Hủy
            </button>
            <button @click="handleDeposit" class="btn btn-primary">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWalletStore } from '../stores/wallet';

const walletStore = useWalletStore();
const walletBalance = computed(() => walletStore.balance);
const transactions = computed(() => walletStore.getRecentTransactions);

const activeFilter = ref('all');
const showDepositModal = ref(false);
const depositAmount = ref(100000);

const filteredTransactions = computed(() => {
  if (activeFilter.value === 'all') {
    return transactions.value;
  }
  
  return transactions.value.filter(transaction => transaction.type === activeFilter.value);
});

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

const handleDeposit = () => {
  if (depositAmount.value < 10000) {
    alert('Số tiền nạp tối thiểu là 10,000 VND');
    return;
  }
  
  walletStore.addTransaction('deposit', depositAmount.value, 'Nạp tiền vào ví');
  alert('Nạp tiền thành công!');
  showDepositModal.value = false;
};
</script>
