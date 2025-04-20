<template>
  <div class="bg-white">
    <section class="py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-6">Danh sách khóa học</h1>
        <div class="mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <!-- Search Bar -->
            <div class="relative w-full md:w-80">
              <input type="text" v-model="searchQuery" placeholder="Tìm kiếm khóa học..."
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
              <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Sort Options -->
            <div class="flex items-center gap-2">
              <label for="sort" class="text-sm font-medium text-gray-700">Sắp xếp theo:</label>
              <select id="sort" v-model="sortOption"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
                <option value="sales-desc">Bán chạy nhất</option>
              </select>
            </div>

            <!-- Filter Toggle Button (Mobile) -->
            <button @click="showFilters = !showFilters"
              class="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {{ showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc' }}
            </button>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar Filters -->
          <div :class="{
            'hidden md:block': !showFilters,
            'block': showFilters
          }" class="w-full md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <div class="bg-gray-50 rounded-lg p-4 sticky top-20">
              <h2 class="text-lg font-semibold mb-4">Bộ lọc</h2>

              <!-- Category Filter -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-2">Cấp độ</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input id="level-all" type="checkbox" v-model="filters.levels.all" @change="toggleAllLevels"
                      class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <label for="level-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>

                  <div v-for="level in availableLevels" :key="level" class="flex items-center">
                    <input :id="`level-${level}`" type="checkbox" v-model="filters.levels.selected[level]"
                      @change="updateAllLevelsState"
                      class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <label :for="`level-${level}`" class="ml-2 text-sm text-gray-700">{{ level }}</label>
                  </div>
                </div>
              </div>

              <!-- Price Range Filter -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-2">Khoảng giá</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input id="price-all" type="radio" v-model="filters.priceRange" value="all"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="price-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>

                  <div class="flex items-center">
                    <input id="price-under-500k" type="radio" v-model="filters.priceRange" value="under-500k"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="price-under-500k" class="ml-2 text-sm text-gray-700">Dưới 500.000₫</label>
                  </div>

                  <div class="flex items-center">
                    <input id="price-500k-1m" type="radio" v-model="filters.priceRange" value="500k-1m"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="price-500k-1m" class="ml-2 text-sm text-gray-700">500.000₫ - 1.000.000₫</label>
                  </div>

                  <div class="flex items-center">
                    <input id="price-over-1m" type="radio" v-model="filters.priceRange" value="over-1m"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="price-over-1m" class="ml-2 text-sm text-gray-700">Trên 1.000.000₫</label>
                  </div>
                </div>
              </div>

              <!-- Sales Count Filter -->
              <div class="mb-4">
                <h3 class="font-medium text-gray-900 mb-2">Lượt bán</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input id="sales-all" type="radio" v-model="filters.salesCount" value="all"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="sales-all" class="ml-2 text-sm text-gray-700">Tất cả</label>
                  </div>

                  <div class="flex items-center">
                    <input id="sales-under-50" type="radio" v-model="filters.salesCount" value="under-50"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="sales-under-50" class="ml-2 text-sm text-gray-700">Dưới 50 lượt</label>
                  </div>

                  <div class="flex items-center">
                    <input id="sales-50-100" type="radio" v-model="filters.salesCount" value="50-100"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="sales-50-100" class="ml-2 text-sm text-gray-700">50 - 100 lượt</label>
                  </div>

                  <div class="flex items-center">
                    <input id="sales-over-100" type="radio" v-model="filters.salesCount" value="over-100"
                      class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label for="sales-over-100" class="ml-2 text-sm text-gray-700">Trên 100 lượt</label>
                  </div>
                </div>
              </div>

              <!-- Reset Filters Button -->
              <button @click="resetFilters"
                class="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium">
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          <!-- Course Grid -->
          <div class="w-full md:w-3/4 lg:w-4/5">
            <div v-if="filteredAndSortedCourses.length > 0"
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <CourseCard v-for="course in filteredAndSortedCourses" :key="course.id" :course="course"
                :purchased-ids="purchasedCourseIds" @buy-now="handleBuyNow" />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-medium text-gray-900 mb-1">Không tìm thấy khóa học</h3>
              <p class="text-gray-500">Vui lòng thử tìm kiếm với từ khóa khác</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Purchase Modal -->
    <div v-if="showPurchaseModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <!-- Modal Header with Course Image -->
        <div class="relative">
          <div class="h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
            <img :src="selectedCourse.image" :alt="selectedCourse.title" class="w-full h-full object-cover opacity-50">
            <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <h3 class="text-2xl font-bold mb-2">{{ selectedCourse.title }}</h3>
              <p class="text-sm opacity-90">{{ selectedCourse.description }}</p>
            </div>
          </div>

          <!-- Close button -->
          <button @click="showPurchaseModal = false"
            class="absolute top-2 right-2 bg-white bg-opacity-20 text-white rounded-full p-1 hover:bg-opacity-30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Course Details -->
            <div class="flex-1">
              <h4 class="text-lg font-bold text-gray-900 mb-2">Thông tin khóa học</h4>

              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Thời lượng</p>
                    <p class="text-sm text-gray-500">{{ selectedCourse.duration }} giờ học</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Cấp độ</p>
                    <p class="text-sm text-gray-500">{{ selectedCourse.level }}</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Ngôn ngữ</p>
                    <p class="text-sm text-gray-500">Tiếng Việt</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Học viên</p>
                    <p class="text-sm text-gray-500">{{ selectedCourse.students }} người đã đăng ký</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Chứng chỉ</p>
                    <p class="text-sm text-gray-500">Có chứng chỉ hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Details -->
            <div class="flex-1">
              <h4 class="text-lg font-bold text-gray-900 mb-2">Thanh toán</h4>

              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600">Giá khóa học:</span>
                  <span class="font-bold text-lg">{{ formatCurrency(selectedCourse.price) }}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600">Thuế VAT (10%):</span>
                  <span class="font-medium">{{ formatCurrency(selectedCourse.price * 0.1) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-900">Tổng thanh toán:</span>
                    <span class="font-bold text-lg text-blue-600">{{ formatCurrency(selectedCourse.price * 1.1)
                      }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-blue-700">Số dư ví:</span>
                  <span class="font-medium text-blue-700">{{ formatCurrency(walletBalance) }}</span>
                </div>
                <div class="border-t border-blue-100 pt-2 mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-blue-800">Số dư còn lại:</span>
                    <span class="font-medium"
                      :class="{ 'text-red-600': walletBalance < selectedCourse.price * 1.1, 'text-green-600': walletBalance >= selectedCourse.price * 1.1 }">
                      {{ formatCurrency(walletBalance - selectedCourse.price * 1.1) }}
                    </span>
                  </div>
                </div>

                <!-- Insufficient Balance Warning -->
                <div v-if="walletBalance < selectedCourse.price * 1.1"
                  class="mt-2 text-red-600 text-xs flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 flex-shrink-0" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Số dư không đủ để thanh toán. Vui lòng nạp thêm tiền vào ví.</span>
                </div>
              </div>

              <div class="space-y-3">
                <h5 class="text-sm font-medium text-gray-900">Bạn sẽ nhận được:</h5>
                <div class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Truy cập trọn đời vào khóa học
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Chứng chỉ hoàn thành
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Hỗ trợ kỹ thuật 24/7
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
          <button @click="showPurchaseModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            Hủy
          </button>
          <button @click="confirmPurchase" type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            :disabled="walletBalance < selectedCourse.price * 1.1"
            :class="{ 'opacity-50 cursor-not-allowed': walletBalance < selectedCourse.price * 1.1 }">
            Thanh toán ngay
          </button>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
            <input type="number" id="amount" v-model="depositAmount" min="10000" step="10000"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useWalletStore } from '../stores/wallet';
import CourseCard from '../components/CourseCard.vue';
import coursesData from '../data/courses.js';
import { showSuccess, showError, initSweetAlert } from '../utils/alert';

const walletStore = useWalletStore();
const walletBalance = computed(() => walletStore.balance);

// Use the hard-coded data directly
const allCourses = ref(coursesData);

// UI state
const searchQuery = ref('');
const sortOption = ref('default');
const showPurchaseModal = ref(false);
const showDepositModal = ref(false);
const showFilters = ref(false); // For mobile filter toggle
const selectedCourse = ref(null);
const depositAmount = ref(100000);

// Track purchased courses
const purchasedCourseIds = ref([]);

// Get all available levels from courses data
const availableLevels = computed(() => {
  const levels = new Set();
  allCourses.value.forEach(course => {
    if (course.level) {
      levels.add(course.level);
    }
  });
  return Array.from(levels);
});

// Filter state
const filters = reactive({
  levels: {
    all: true,
    selected: {}
  },
  priceRange: 'all',
  salesCount: 'all'
});

// Initialize level filters
onMounted(() => {
  availableLevels.value.forEach(level => {
    filters.levels.selected[level] = true;
  });

  initSweetAlert();
});

// Filter functions
function toggleAllLevels() {
  availableLevels.value.forEach(level => {
    filters.levels.selected[level] = filters.levels.all;
  });
}

function updateAllLevelsState() {
  const allSelected = availableLevels.value.every(level => filters.levels.selected[level]);
  const noneSelected = availableLevels.value.every(level => !filters.levels.selected[level]);

  // If none are selected, select all to avoid empty results
  if (noneSelected) {
    filters.levels.all = true;
    toggleAllLevels();
  } else {
    filters.levels.all = allSelected;
  }
}

function resetFilters() {
  filters.levels.all = true;
  availableLevels.value.forEach(level => {
    filters.levels.selected[level] = true;
  });
  filters.priceRange = 'all';
  filters.salesCount = 'all';
}

// Apply filters
const filteredAndSortedCourses = computed(() => {
  // First filter out purchased courses
  let result = allCourses.value.filter(course => !purchasedCourseIds.value.includes(course.id));

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.topics.some(topic => topic.toLowerCase().includes(query)) ||
      course.instructor.toLowerCase().includes(query)
    );
  }

  // Apply level filter
  if (!filters.levels.all) {
    result = result.filter(course =>
      course.level && filters.levels.selected[course.level]
    );
  }

  // Apply price range filter
  if (filters.priceRange !== 'all') {
    result = result.filter(course => {
      switch (filters.priceRange) {
        case 'under-500k':
          return course.price < 500000;
        case '500k-1m':
          return course.price >= 500000 && course.price <= 1000000;
        case 'over-1m':
          return course.price > 1000000;
        default:
          return true;
      }
    });
  }

  // Apply sales count filter
  if (filters.salesCount !== 'all') {
    result = result.filter(course => {
      switch (filters.salesCount) {
        case 'under-50':
          return course.salesCount < 50;
        case '50-100':
          return course.salesCount >= 50 && course.salesCount <= 100;
        case 'over-100':
          return course.salesCount > 100;
        default:
          return true;
      }
    });
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

const handleBuyNow = (course) => {
  selectedCourse.value = course;
  showPurchaseModal.value = true;
};

const confirmPurchase = () => {
  if (!selectedCourse.value) return;

  const totalPrice = Math.round(selectedCourse.value.price * 1.1); // Including VAT, rounded to avoid floating point issues

  if (walletBalance.value < totalPrice) {
    showError('Số dư không đủ để mua khóa học này!', 'Không đủ số dư');
    return;
  }

  // Add to purchased courses
  purchasedCourseIds.value.push(selectedCourse.value.id);

  // Update sales count
  const courseIndex = allCourses.value.findIndex(c => c.id === selectedCourse.value.id);
  if (courseIndex !== -1) {
    allCourses.value[courseIndex].salesCount = (allCourses.value[courseIndex].salesCount || 0) + 1;
  }

  // Update wallet
  walletStore.addTransaction('purchase', totalPrice, `Mua khóa học: ${selectedCourse.value.title}`);

  // Show beautiful success message with SweetAlert
  showSuccess(
    'Khóa học đã được thêm vào danh sách khóa học của bạn!',
    'Mua khóa học thành công!'
  );

  // Close modal and reset selected course
  showPurchaseModal.value = false;
  console.log('Purchase completed successfully');
};

const handleDeposit = () => {
  if (depositAmount.value < 10000) {
    alert('Số tiền nạp tối thiểu là 10,000 VND');
    return;
  }

  walletStore.addTransaction('deposit', depositAmount.value, 'Nạp tiền vào ví');
  alert('Nạp tiền thành công!');
  showDepositModal.value = false;

  // If there was a course selected, reopen the purchase modal
  if (selectedCourse.value) {
    showPurchaseModal.value = true;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

// Initialize SweetAlert when component is mounted
onMounted(() => {
  initSweetAlert();
});
</script>
