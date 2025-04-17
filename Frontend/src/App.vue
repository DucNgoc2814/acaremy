<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <nav class="container py-3 flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <router-link to="/" class="text-xl font-bold text-white flex items-center mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Course Marketplace
          </router-link>
          
          <!-- Desktop Navigation - Left Side Menu -->
          <div class="hidden md:flex items-center space-x-1">
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
          <!-- Cart Button -->
          <router-link to="/cart" class="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="hidden md:inline">Giỏ hàng</span>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </router-link>
          
          <!-- Wallet Dropdown -->
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
                
                <div class="bg-indigo-50 p-3 rounded-md mb-3">
                  <p class="text-xs text-indigo-700 mb-1">Số dư hiện tại</p>
                  <p class="text-lg font-bold text-indigo-600">{{ formatCurrency(walletBalance) }}</p>
                </div>
                
                <div class="mb-3">
                  <h4 class="text-xs font-medium text-gray-700 mb-2">Giao dịch gần đây</h4>
                  <div v-if="recentTransactions.length > 0" class="space-y-2">
                    <div v-for="transaction in recentTransactions" :key="transaction.id" class="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                      <div>
                        <p class="font-medium" :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
                          {{ transaction.type === 'deposit' ? 'Nạp tiền' : 'Mua khóa học' }}
                        </p>
                        <p class="text-gray-500">{{ formatDate(transaction.date) }}</p>
                      </div>
                      <p :class="transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
                        {{ transaction.type === 'deposit' ? '+' : '-' }} {{ formatCurrency(transaction.amount) }}
                      </p>
                    </div>
                  </div>
                  <div v-else class="text-xs text-gray-500 text-center py-2">
                    Chưa có giao dịch nào
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <router-link to="/transactions" class="flex-1 block text-center px-3 py-2 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition-colors">
                    Xem tất cả giao dịch
                  </router-link>
                  <button @click="showDepositModal = true" class="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors">
                    Nạp tiền
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- User Profile Dropdown -->
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
                  <div class="bg-indigo-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">{{ user.name }}</h3>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </div>
              
              <div class="py-2">
                <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Thông tin tài khoản
                </router-link>
                
                <router-link to="/my-courses" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Khóa học của tôi
                </router-link>
                
                <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Đơn hàng
                </router-link>
                
                <router-link to="/transactions" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Lịch sử nạp tiền
                </router-link>
              </div>
              
              <div class="py-1 border-t border-gray-100">
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Navigation Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden ml-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-indigo-800">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link to="/" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path === '/' }">
            Trang chủ
          </router-link>
          <router-link to="/courses" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path.includes('/courses') }">
            Khóa học
          </router-link>
          <router-link to="/products" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path.includes('/products') }">
            Sản phẩm
          </router-link>
          <router-link to="/cart" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path === '/cart' }">
            <div class="flex justify-between items-center">
              <span>Giỏ hàng</span>
              <span v-if="cartCount > 0" class="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                {{ cartCount }}
              </span>
            </div>
          </router-link>
          <router-link to="/transactions" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path === '/transactions' }">
            <div class="flex justify-between items-center">
              <span>Ví điện tử</span>
              <span class="bg-yellow-400 text-indigo-900 px-2 py-0.5 rounded-full text-xs font-medium">
                {{ formatCurrency(walletBalance) }}
              </span>
            </div>
          </router-link>
          <router-link to="/profile" class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600" :class="{ 'bg-indigo-700': $route.path === '/profile' }">
            <div class="flex items-center">
              <span>Tài khoản</span>
            </div>
          </router-link>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-sm font-bold mb-3">Course Marketplace</h3>
            <p class="text-xs text-gray-300">Nền tảng học trực tuyến với ví điện tử tích hợp.</p>
          </div>
          <div>
            <h3 class="text-sm font-bold mb-3">Liên kết nhanh</h3>
            <ul class="space-y-1 text-xs">
              <li><router-link to="/" class="text-gray-300 hover:text-white">Trang chủ</router-link></li>
              <li><router-link to="/courses" class="text-gray-300 hover:text-white">Khóa học</router-link></li>
              <li><router-link to="/products" class="text-gray-300 hover:text-white">Sản phẩm</router-link></li>
              <li><router-link to="/transactions" class="text-gray-300 hover:text-white">Giao dịch</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-bold mb-3">Liên hệ</h3>
            <p class="text-xs text-gray-300">Email: info@coursemarketplace.com</p>
            <p class="text-xs text-gray-300">Điện thoại: +84 123 456 789</p>
          </div>
        </div>
        <div class="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-300">
          <p>&copy; {{ new Date().getFullYear() }} Course Marketplace. Bản quyền thuộc về chúng tôi.</p>
        </div>
      </div>
    </footer>
    
    <!-- Deposit Modal -->
    <div v-if="showDepositModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">Nạp tiền vào ví</h3>
            <button @click="showDepositModal = false" class="text-gray-400 hover:text-gray-500">
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
              v-model="depositAmount" 
              min="10000"
              step="10000"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div class="flex justify-end gap-3">
            <button @click="showDepositModal = false" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
              Hủy
            </button>
            <button @click="handleDeposit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
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
import { useWalletStore } from './stores/wallet';
import { useCartStore } from './stores/cart';
import { useRoute } from 'vue-router';

const route = useRoute();
const walletStore = useWalletStore();
const cartStore = useCartStore();
const walletBalance = computed(() => walletStore.balance);
const cartCount = computed(() => cartStore.cartCount);
const recentTransactions = computed(() => {
  return walletStore.getRecentTransactions.slice(0, 3);
});
const mobileMenuOpen = ref(false);
const showDepositModal = ref(false);
const depositAmount = ref(100000);

// Mock user data
const user = ref({
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com'
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

const logout = () => {
  alert('Đăng xuất thành công!');
};
</script>

<style>
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
