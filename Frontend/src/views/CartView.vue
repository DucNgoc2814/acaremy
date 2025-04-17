<template>
  <div class="bg-white min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main Cart Content -->
        <div class="md:w-2/3">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
            <p class="text-gray-600">{{ cartItems.length }} sản phẩm trong giỏ hàng</p>
          </div>
          
          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 class="text-xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p class="text-gray-600 mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <router-link to="/courses" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Khám phá khóa học
              </router-link>
              <router-link to="/products" class="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Xem sản phẩm
              </router-link>
            </div>
          </div>
          
          <!-- Cart Items -->
          <div v-else class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div class="p-4 flex flex-col sm:flex-row gap-4">
                <!-- Product Image -->
                <div class="sm:w-1/4 flex-shrink-0">
                  <div class="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
                  </div>
                </div>
                
                <!-- Product Details -->
                <div class="sm:w-3/4 flex flex-col">
                  <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="font-bold text-gray-900 mb-1">{{ item.title }}</h3>
                        <p class="text-sm text-gray-500 mb-2">{{ item.category }}</p>
                      </div>
                      <button @click="removeFromCart(item.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {{ item.category }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-gray-100">
                    <!-- Price -->
                    <div class="mb-3 sm:mb-0">
                      <div v-if="hasDiscount(item)" class="flex items-center">
                        <p class="text-sm text-gray-500 line-through mr-2">{{ formatCurrency(getOriginalPrice(item)) }}</p>
                        <p class="text-lg font-bold text-red-600">{{ formatCurrency(item.price) }}</p>
                      </div>
                      <div v-else>
                        <p class="text-lg font-bold text-blue-600">{{ formatCurrency(item.price) }}</p>
                      </div>
                    </div>
                    
                    <!-- Quantity Controls -->
                    <div class="flex items-center">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                        :disabled="item.quantity <= 1"
                        :class="{'opacity-50 cursor-not-allowed': item.quantity <= 1}"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <div class="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm">
                        {{ item.quantity }}
                      </div>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    
                    <!-- Item Total -->
                    <div class="mt-3 sm:mt-0 text-right">
                      <p class="text-sm text-gray-600">Thành tiền:</p>
                      <p class="text-lg font-bold text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Cart Actions -->
            <div class="flex justify-between items-center mt-6 py-4 border-t border-gray-200">
              <button 
                @click="clearCart" 
                class="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa giỏ hàng
              </button>
              <router-link to="/products" class="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tiếp tục mua sắm
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="md:w-1/3 mt-8 md:mt-0">
          <div class="bg-gray-50 rounded-lg p-6 sticky top-20">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            
            <div v-if="cartItems.length > 0">
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Tạm tính ({{ cartItems.length }} sản phẩm)</span>
                  <span class="font-medium">{{ formatCurrency(cartSubtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Phí vận chuyển</span>
                  <span class="font-medium">{{ formatCurrency(shippingFee) }}</span>
                </div>
                <div v-if="totalDiscount > 0" class="flex justify-between text-sm">
                  <span class="text-green-600">Tiết kiệm</span>
                  <span class="font-medium text-green-600">-{{ formatCurrency(totalDiscount) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-3 mt-3">
                  <div class="flex justify-between">
                    <span class="font-bold text-gray-900">Tổng cộng</span>
                    <span class="font-bold text-lg text-gray-900">{{ formatCurrency(cartTotal + shippingFee) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-50 p-4 rounded-md mb-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-blue-700">Số dư ví:</span>
                  <span class="font-medium text-blue-700">{{ formatCurrency(walletBalance) }}</span>
                </div>
                <div class="border-t border-blue-100 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-blue-800">Số dư còn lại:</span>
                    <span class="font-medium" :class="{'text-red-600': walletBalance < (cartTotal + shippingFee), 'text-green-600': walletBalance >= (cartTotal + shippingFee)}">
                      {{ formatCurrency(walletBalance - (cartTotal + shippingFee)) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Insufficient Balance Warning -->
              <div v-if="walletBalance < (cartTotal + shippingFee)" class="bg-red-50 border border-red-100 rounded-md p-3 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-700">Số dư không đủ để thanh toán. Vui lòng nạp thêm tiền.</p>
                  </div>
                </div>
              </div>
              
              <button 
                @click="checkout"
                class="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center"
                :disabled="cartItems.length === 0 || walletBalance < (cartTotal + shippingFee)"
                :class="{'opacity-50 cursor-not-allowed': cartItems.length === 0 || walletBalance < (cartTotal + shippingFee)}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Thanh toán
              </button>
              
              <button 
                v-if="walletBalance < (cartTotal + shippingFee)"
                @click="showDepositModal = true"
                class="w-full mt-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Nạp tiền vào ví
              </button>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-600 mb-4">Chưa có sản phẩm nào trong giỏ hàng</p>
              <router-link to="/products" class="text-blue-600 hover:text-blue-800 font-medium">
                Khám phá sản phẩm
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
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
            <button @click="handleDeposit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Checkout Success Modal -->
    <div v-if="showCheckoutSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h3>
          <p class="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại Academy. Đơn hàng của bạn đang được xử lý.</p>
          <button 
            @click="showCheckoutSuccess = false"
            class="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWalletStore } from '../stores/wallet';
import { useCartStore } from '../stores/cart';
import productsData from '../data/products.js';

const walletStore = useWalletStore();
const cartStore = useCartStore();
const walletBalance = computed(() => walletStore.balance);

// Cart state
const cartItems = computed(() => cartStore.cartItems);
const cartTotal = computed(() => cartStore.cartTotal);
const shippingFee = ref(30000); // Fixed shipping fee

// Modal states
const showDepositModal = ref(false);
const showCheckoutSuccess = ref(false);
const depositAmount = ref(100000);

// Calculate total discount (original price - discounted price)
const totalDiscount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const product = productsData.find(p => p.id === item.id);
    if (product && product.discountPercent > 0) {
      return total + ((product.price - product.discountedPrice) * item.quantity);
    }
    return total;
  }, 0);
});

// Calculate subtotal (before discount)
const cartSubtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const product = productsData.find(p => p.id === item.id);
    if (product) {
      return total + (product.price * item.quantity);
    }
    return total + (item.price * item.quantity);
  }, 0);
});

// Cart functions
function removeFromCart(productId) {
  cartStore.removeFromCart(productId);
}

function updateQuantity(productId, quantity) {
  cartStore.updateQuantity(productId, quantity);
}

function clearCart() {
  if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
    cartStore.clearCart();
  }
}

function checkout() {
  const totalAmount = cartTotal.value + shippingFee.value;
  
  if (walletBalance.value < totalAmount) {
    alert('Số dư không đủ để thanh toán đơn hàng này!');
    return;
  }
  
  // Update wallet
  walletStore.addTransaction('purchase', totalAmount, 'Thanh toán đơn hàng sản phẩm');
  
  // Update product sales count
  // Note: In a real app, this would be handled by the backend
  
  // Clear cart and show success
  cartStore.clearCart();
  showCheckoutSuccess.value = true;
}

function handleDeposit() {
  if (depositAmount.value < 10000) {
    alert('Số tiền nạp tối thiểu là 10,000 VND');
    return;
  }
  
  walletStore.addTransaction('deposit', depositAmount.value, 'Nạp tiền vào ví');
  alert('Nạp tiền thành công!');
  showDepositModal.value = false;
}

// Helper functions
function hasDiscount(item) {
  const product = productsData.find(p => p.id === item.id);
  return product && product.discountPercent > 0;
}

function getOriginalPrice(item) {
  const product = productsData.find(p => p.id === item.id);
  return product ? product.price : item.price;
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>
