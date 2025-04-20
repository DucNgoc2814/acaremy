<template>
  <div class="bg-white">
    <section class="py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-6">Tất cả sản phẩm </h1>
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
            
            <!-- Filter Toggle Button (Mobile) -->
            <button 
              @click="showFilters = !showFilters" 
              class="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {{ showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc' }}
            </button>
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar Filters -->
          <div 
            :class="{
              'hidden md:block': !showFilters,
              'block': showFilters
            }" 
            class="w-full md:w-1/4 lg:w-1/5 mb-6 md:mb-0"
          >
            <div class="bg-gray-50 rounded-lg p-4 sticky top-20">
              <h2 class="text-lg font-semibold mb-4">Bộ lọc</h2>
              
              <!-- Category Filter -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-2">Danh mục</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input 
                      id="category-all" 
                      type="checkbox" 
                      v-model="filters.categories.all" 
                      @change="toggleAllCategories"
                      class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label for="category-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>
                  
                  <div v-for="category in availableCategories" :key="category.value" class="flex items-center">
                    <input 
                      :id="`category-${category.value}`" 
                      type="checkbox" 
                      v-model="filters.categories.selected[category.value]" 
                      @change="updateAllCategoriesState"
                      class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label :for="`category-${category.value}`" class="ml-2 text-sm text-gray-700">{{ category.label }}</label>
                  </div>
                </div>
              </div>
              
              <!-- Price Range Filter -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-2">Khoảng giá</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input 
                      id="price-all" 
                      type="radio" 
                      v-model="filters.priceRange" 
                      value="all"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="price-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="price-under-100k" 
                      type="radio" 
                      v-model="filters.priceRange" 
                      value="under-100k"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="price-under-100k" class="ml-2 text-sm text-gray-700">Dưới 100.000đ</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="price-100k-500k" 
                      type="radio" 
                      v-model="filters.priceRange" 
                      value="100k-500k"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="price-100k-500k" class="ml-2 text-sm text-gray-700">100.000đ - 500.000đ</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="price-500k-1m" 
                      type="radio" 
                      v-model="filters.priceRange" 
                      value="500k-1m"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="price-500k-1m" class="ml-2 text-sm text-gray-700">500.000đ - 1.000.000đ</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="price-over-1m" 
                      type="radio" 
                      v-model="filters.priceRange" 
                      value="over-1m"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="price-over-1m" class="ml-2 text-sm text-gray-700">Trên 1.000.000đ</label>
                  </div>
                </div>
              </div>
              
              <!-- Sales Count Filter -->
              <div class="mb-4">
                <h3 class="font-medium text-gray-900 mb-2">Lượt bán</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input 
                      id="sales-all" 
                      type="radio" 
                      v-model="filters.salesCount" 
                      value="all"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="sales-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="sales-under-10" 
                      type="radio" 
                      v-model="filters.salesCount" 
                      value="under-10"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="sales-under-10" class="ml-2 text-sm text-gray-700">Dưới 10</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="sales-10-50" 
                      type="radio" 
                      v-model="filters.salesCount" 
                      value="10-50"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="sales-10-50" class="ml-2 text-sm text-gray-700">10 - 50</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="sales-over-50" 
                      type="radio" 
                      v-model="filters.salesCount" 
                      value="over-50"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label for="sales-over-50" class="ml-2 text-sm text-gray-700">Trên 50</label>
                  </div>
                </div>
              </div>
              
              <!-- Reset Filters Button -->
              <button 
                @click="resetFilters" 
                class="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>
          
          <!-- Product Grid -->
          <div class="w-full md:w-3/4 lg:w-4/5">
            <!-- Product Grid -->
            <div class="mb-4">
              <h2 class="text-xl font-bold mb-4">{{ categoryFilter === 'all' ? 'Tất cả sản phẩm' : getCategoryTitle(categoryFilter) }}</h2>
              <div v-if="filteredAndSortedProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="product in filteredAndSortedProducts" :key="product.id" class="relative">
                  <ProductCard :product="product" @add-to-cart="addToCart" />
                </div>
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
                <span class="font-bold text-lg text-blue-600">{{ formatCurrency(orderTotal) }}</span>
              </div>
            </div>
          </div>
          
          <button 
            @click="checkout" 
            class="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
    
    <!-- Cart Overlay -->
    <div 
      v-if="isCartOpen" 
      @click="isCartOpen = false" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useWalletStore } from '../stores/wallet';
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products';
import { useCartStore } from '../stores/cart';
import Swal from 'sweetalert2';

// Stores
const walletStore = useWalletStore();
const cartStore = useCartStore();

// UI State
const searchQuery = ref('');
const sortOption = ref('default');
const isCartOpen = ref(false);
const showFilters = ref(false);
const categoryFilter = ref('all');

// Filter State
const availableCategories = [
  { value: 'book', label: 'Sách' },
  { value: 'software', label: 'Phần mềm' },
  { value: 'hardware', label: 'Phần cứng' }
];

const filters = reactive({
  categories: {
    all: true,
    selected: {
      book: true,
      software: true,
      hardware: true
    }
  },
  priceRange: 'all',
  salesCount: 'all'
});

// Cart State
const cartItems = computed(() => cartStore.cartItems);
const cartCount = computed(() => cartStore.cartCount);
const cartTotal = computed(() => cartStore.cartTotal);
const shippingFee = computed(() => cartTotal.value > 500000 ? 0 : 30000);
const orderTotal = computed(() => cartTotal.value + shippingFee.value);

// Products
const allProducts = ref(productsData);
const featuredProducts = computed(() => {
  return allProducts.value.filter(product => product.featured).slice(0, 4);
});

// Filter functions
function toggleAllCategories() {
  // When 'all' checkbox is clicked, update all category checkboxes
  const newState = filters.categories.all;
  Object.keys(filters.categories.selected).forEach(category => {
    filters.categories.selected[category] = newState;
  });
  
  // Force update of filtered products
  categoryFilter.value = newState ? 'all' : '';
}

function updateAllCategoriesState() {
  const allSelected = Object.values(filters.categories.selected).every(value => value === true);
  const noneSelected = Object.values(filters.categories.selected).every(value => value === false);
  
  if (allSelected) {
    filters.categories.all = true;
    categoryFilter.value = 'all';
  } else if (noneSelected) {
    // If none are selected, select all (to avoid empty results)
    filters.categories.all = true;
    toggleAllCategories();
    categoryFilter.value = 'all';
  } else {
    filters.categories.all = false;
    // Set category filter to the selected category if only one is selected
    const selectedCategories = Object.entries(filters.categories.selected)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);
    
    if (selectedCategories.length === 1) {
      categoryFilter.value = selectedCategories[0];
    } else {
      categoryFilter.value = '';
    }
  }
}

function resetFilters() {
  // Reset all filter states
  filters.categories.all = true;
  Object.keys(filters.categories.selected).forEach(category => {
    filters.categories.selected[category] = true;
  });
  filters.priceRange = 'all';
  filters.salesCount = 'all';
  searchQuery.value = '';
  sortOption.value = 'default';
  categoryFilter.value = 'all';
  showFilters.value = false; // Hide filters on mobile after reset
}

// Filtered Products
const filteredAndSortedProducts = computed(() => {
  let result = allProducts.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
  
  // Apply specific category filter if categoryFilter is set
  if (categoryFilter.value && categoryFilter.value !== 'all') {
    result = result.filter(product => product.category === categoryFilter.value);
  }
  // Otherwise apply multiple category filter based on checkboxes
  else if (!filters.categories.all) {
    result = result.filter(product => 
      filters.categories.selected[product.category]
    );
  }
  
  // Apply price range filter
  if (filters.priceRange !== 'all') {
    result = result.filter(product => {
      const price = product.price;
      switch (filters.priceRange) {
        case 'under-100k':
          return price < 100000;
        case '100k-500k':
          return price >= 100000 && price <= 500000;
        case '500k-1m':
          return price > 500000 && price <= 1000000;
        case 'over-1m':
          return price > 1000000;
        default:
          return true;
      }
    });
  }
  
  // Apply sales count filter
  if (filters.salesCount !== 'all') {
    result = result.filter(product => {
      const sales = product.sales || 0;
      switch (filters.salesCount) {
        case 'under-10':
          return sales < 10;
        case '10-50':
          return sales >= 10 && sales <= 50;
        case 'over-50':
          return sales > 50;
        default:
          return true;
      }
    });
  }
  
  // Apply sort
  if (sortOption.value !== 'default') {
    result = [...result].sort((a, b) => {
      switch (sortOption.value) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'sales-desc':
          return (b.sales || 0) - (a.sales || 0);
        default:
          return 0;
      }
    });
  }
  
  return result;
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
  if (orderTotal.value > walletStore.balance) {
    Swal.fire({
      title: 'Số dư không đủ',
      text: 'Vui lòng nạp thêm tiền vào ví để tiếp tục thanh toán',
      icon: 'error',
      confirmButtonText: 'Đóng'
    });
    return;
  }
  
  // Process the order
  walletStore.addTransaction('product_purchase', orderTotal.value, `Thanh toán đơn hàng (${cartCount.value} sản phẩm)`);
  
  Swal.fire({
    title: 'Đặt hàng thành công!',
    text: 'Cảm ơn bạn đã mua sắm tại Course Marketplace',
    icon: 'success',
    confirmButtonText: 'Tiếp tục mua sắm'
  });
  
  clearCart();
  isCartOpen.value = false;
}

// Helper functions
function getCategoryTitle(category) {
  switch(category) {
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

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(value);
}
</script>
