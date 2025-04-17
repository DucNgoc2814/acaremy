<template>
  <div class="bg-white min-h-screen">
    <div v-if="product" class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Trang chủ
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <router-link to="/products" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Sản phẩm</router-link>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">{{ product.title }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <!-- Product Image -->
        <div class="bg-gray-100 rounded-lg overflow-hidden">
          <img :src="product.image" :alt="product.title" class="w-full h-auto object-cover">
        </div>
        
        <!-- Product Info -->
        <div>
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {{ product.category }}
              </span>
              <span v-if="product.featured" class="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                Nổi bật
              </span>
              <span v-if="product.discountPercent > 0" class="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                -{{ product.discountPercent }}%
              </span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.title }}</h1>
            <div class="flex items-center gap-4 mb-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm text-gray-500 ml-1">({{ product.salesCount }} đánh giá)</span>
              </div>
              <div class="text-sm text-gray-500">
                <span>{{ product.salesCount }} đã bán</span>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <div v-if="product.discountPercent > 0" class="flex items-center gap-2 mb-1">
              <span class="text-3xl font-bold text-red-600">{{ formatCurrency(product.discountedPrice) }}</span>
              <span class="text-lg text-gray-500 line-through">{{ formatCurrency(product.price) }}</span>
            </div>
            <div v-else class="mb-1">
              <span class="text-3xl font-bold text-blue-600">{{ formatCurrency(product.price) }}</span>
            </div>
            
            <div v-if="product.discountPercent > 0" class="text-sm text-green-600 mb-2">
              Tiết kiệm {{ formatCurrency(product.price - product.discountedPrice) }} ({{ product.discountPercent }}%)
            </div>
            
            <div class="flex items-center gap-2 mt-4">
              <span class="text-sm font-medium text-gray-700">Tình trạng:</span>
              <span v-if="product.inStock" class="text-sm text-green-600 font-medium">Còn hàng</span>
              <span v-else class="text-sm text-red-600 font-medium">Hết hàng</span>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="flex items-center gap-4">
              <div class="w-32">
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                <div class="flex border border-gray-300 rounded-md">
                  <button 
                    @click="decreaseQuantity" 
                    class="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    :disabled="quantity <= 1"
                    :class="{'opacity-50 cursor-not-allowed': quantity <= 1}"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity" 
                    v-model="quantity" 
                    min="1" 
                    class="w-full text-center border-x border-gray-300 focus:outline-none py-2"
                  >
                  <button 
                    @click="increaseQuantity" 
                    class="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <button 
              @click="addToCart" 
              class="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center"
              :disabled="!product.inStock"
              :class="{'opacity-50 cursor-not-allowed': !product.inStock}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm vào giỏ hàng
            </button>
            <button 
              @click="buyNow" 
              class="px-6 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 transition-colors"
              :disabled="!product.inStock"
              :class="{'opacity-50 cursor-not-allowed': !product.inStock}"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      
      <!-- Product Description -->
      <div class="mb-10">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <p class="text-gray-700 whitespace-pre-line">{{ product.description }}</p>
        </div>
      </div>
      
      <!-- Related Products -->
      <div class="mb-10">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Sản phẩm liên quan</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct"
            @add-to-cart="addRelatedToCart"
          />
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-else class="container mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div class="bg-gray-200 rounded-lg h-96"></div>
          <div>
            <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div class="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div class="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add to Cart Success Toast -->
    <div 
      v-if="showAddedToast" 
      class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Đã thêm vào giỏ hàng!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref(null);
const quantity = ref(1);
const showAddedToast = ref(false);

// Get product by ID from route params
onMounted(() => {
  const productId = parseInt(route.params.id);
  product.value = productsData.find(p => p.id === productId);
  
  if (!product.value) {
    router.push('/products');
  }
});

// Related products (same category, excluding current product)
const relatedProducts = computed(() => {
  if (!product.value) return [];
  
  return productsData
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 5);
});

// Methods
function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  if (!product.value || !product.value.inStock) return;
  
  cartStore.addToCart({
    ...product.value,
    quantity: quantity.value
  });
  
  // Show toast
  showAddedToast.value = true;
  setTimeout(() => {
    showAddedToast.value = false;
  }, 3000);
}

function addRelatedToCart(relatedProduct) {
  cartStore.addToCart(relatedProduct);
  
  // Show toast
  showAddedToast.value = true;
  setTimeout(() => {
    showAddedToast.value = false;
  }, 3000);
}

function buyNow() {
  if (!product.value || !product.value.inStock) return;
  
  // Add to cart first
  cartStore.addToCart({
    ...product.value,
    quantity: quantity.value
  });
  
  // Navigate to cart
  router.push('/cart');
}

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
