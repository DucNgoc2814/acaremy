<template>
  <div class="bg-white">
    <section class="py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-2">Sản phẩm liên quan</h1>
        <p class="text-gray-600 mb-6">Các sản phẩm hỗ trợ việc học tập và phát triển kỹ năng lập trình</p>
        
        <div class="mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <!-- Search Bar -->
            <div class="relative w-full md:w-80">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Tìm kiếm sản phẩm..." 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <!-- Filter Options -->
            <div class="flex items-center gap-2">
              <label for="category" class="text-sm font-medium text-gray-700">Danh mục:</label>
              <select 
                id="category" 
                v-model="categoryFilter" 
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="book">Sách</option>
                <option value="software">Phần mềm</option>
                <option value="hardware">Phần cứng</option>
              </select>
            </div>
            
            <!-- Sort Options -->
            <div class="flex items-center gap-2">
              <label for="sort" class="text-sm font-medium text-gray-700">Sắp xếp theo:</label>
              <select 
                id="sort" 
                v-model="sortOption" 
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
                <option value="sales-desc">Bán chạy nhất</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button 
            @click="categoryFilter = 'all'" 
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            Tất cả
          </button>
          <button 
            @click="categoryFilter = 'book'" 
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="categoryFilter === 'book' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            Sách
          </button>
          <button 
            @click="categoryFilter = 'software'" 
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="categoryFilter === 'software' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            Phần mềm
          </button>
          <button 
            @click="categoryFilter = 'hardware'" 
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="categoryFilter === 'hardware' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            Phần cứng
          </button>
        </div>
        
        <!-- Featured Products Banner -->
        <div v-if="featuredProducts.length > 0 && categoryFilter === 'all'" class="mb-8">
          <h2 class="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="product in featuredProducts.slice(0, 4)" :key="product.id" class="relative">
              <ProductCard :product="product" @add-to-cart="addToCart" />
            </div>
          </div>
        </div>
        
        <!-- Product Grid -->
        <div class="mb-4">
          <h2 class="text-xl font-bold mb-4">{{ categoryFilter === 'all' ? 'Tất cả sản phẩm' : getCategoryTitle(categoryFilter) }}</h2>
          <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
          
          <!-- Empty State -->
          <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-medium text-gray-900 mb-1">Không tìm thấy sản phẩm</h3>
            <p class="text-gray-500">Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Shopping Cart Sidebar -->
    <div 
      class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-lg transform transition-transform duration-300 z-50"
      :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex flex-col h-full">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900">Giỏ hàng ({{ cartCount }})</h2>
            <button @click="isCartOpen = false" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex-grow overflow-y-auto p-4">
          <div v-if="cartItems.length === 0" class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-1">Giỏ hàng trống</h3>
            <p class="text-gray-500 mb-4">Hãy thêm sản phẩm vào giỏ hàng</p>
            <button @click="isCartOpen = false" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
              Tiếp tục mua sắm
            </button>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
              </div>
              <div class="flex-grow">
                <h4 class="text-sm font-medium text-gray-900 line-clamp-1">{{ item.title }}</h4>
                <p class="text-xs text-gray-500 mb-1">{{ item.category }}</p>
                <p class="text-sm font-bold text-blue-600">{{ formatCurrency(item.price) }}</p>
              </div>
              <div class="flex flex-col items-end">
                <button @click="removeFromCart(item.id)" class="text-gray-400 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <div class="flex items-center mt-2 border border-gray-200 rounded">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="px-2 py-1 text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span class="px-2 py-1 text-xs">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="px-2 py-1 text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="cartItems.length > 0" class="p-4 border-t border-gray-200">
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600">Tổng tiền:</span>
              <span class="font-bold text-lg">{{ formatCurrency(cartTotal) }}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600">Phí vận chuyển:</span>
              <span class="font-medium">{{ formatCurrency(shippingFee) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2 mt-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-900">Tổng thanh toán:</span>
                <span class="font-bold text-lg text-blue-600">{{ formatCurrency(cartTotal + shippingFee) }}</span>
              </div>
            </div>
          </div>
          
          <button 
            @click="checkout"
            class="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Thanh toán
          </button>
          
          <button 
            @click="clearCart"
            class="w-full py-2 mt-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            Xóa giỏ hàng
          </button>
        </div>
      </div>
    </div>
    
    <!-- Cart Overlay -->
    <div 
      v-if="isCartOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="isCartOpen = false"
    ></div>
    
    <!-- Floating Cart Button -->
    <button 
      @click="isCartOpen = true"
      class="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-30"
    >
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {{ cartCount }}
        </span>
      </div>
    </button>
    
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
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products.js';

const walletStore = useWalletStore();
const cartStore = useCartStore();
const walletBalance = computed(() => walletStore.balance);

// Products data
const products = ref(productsData);

// Filters and sorting
const searchQuery = ref('');
const categoryFilter = ref('all');
const sortOption = ref('default');

// Cart state
const isCartOpen = ref(false);
const showCheckoutSuccess = ref(false);
const shippingFee = ref(30000); // Fixed shipping fee

// Cart getters from store
const cartItems = computed(() => cartStore.cartItems);
const cartCount = computed(() => cartStore.cartCount);
const cartTotal = computed(() => cartStore.cartTotal);

// Featured products
const featuredProducts = computed(() => {
  return products.value.filter(product => product.featured);
});

// Filtered products
const filteredProducts = computed(() => {
  let result = products.value;
  
  // Apply category filter
  if (categoryFilter.value !== 'all') {
    result = result.filter(product => product.category === categoryFilter.value);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  switch (sortOption.value) {
    case 'price-asc':
      return [...result].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...result].sort((a, b) => b.price - a.price);
    case 'name-asc':
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return [...result].sort((a, b) => b.title.localeCompare(a.title));
    case 'sales-desc':
      return [...result].sort((a, b) => b.salesCount - a.salesCount);
    default:
      return result;
  }
});

// Cart functions
function addToCart(product) {
  cartStore.addToCart(product);
  isCartOpen.value = true;
}

function removeFromCart(productId) {
  cartStore.removeFromCart(productId);
}

function updateQuantity(productId, quantity) {
  cartStore.updateQuantity(productId, quantity);
}

function clearCart() {
  cartStore.clearCart();
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
  cartItems.value.forEach(item => {
    const productIndex = products.value.findIndex(p => p.id === item.id);
    if (productIndex !== -1) {
      products.value[productIndex].salesCount += item.quantity;
    }
  });
  
  // Clear cart and show success
  clearCart();
  isCartOpen.value = false;
  showCheckoutSuccess.value = true;
}

// Helper functions
function getCategoryTitle(category) {
  switch (category) {
    case 'book':
      return 'Sách';
    case 'software':
      return 'Phần mềm';
    case 'hardware':
      return 'Phần cứng';
    default:
      return 'Tất cả sản phẩm';
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>
