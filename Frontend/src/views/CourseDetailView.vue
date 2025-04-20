<template>
  <div v-if="course" class="py-8">
    <div class="container">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/3 p-6 flex items-center justify-center bg-gray-100">
            <img :src="course.image" :alt="course.title" class="w-full max-w-xs object-contain h-64">
          </div>

          <div class="md:w-2/3 p-6 md:p-8">
            <h1 class="text-3xl font-bold mb-4">{{ course.title }}</h1>

            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ course.level }}
              </span>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ course.duration }}
              </span>
              <span v-for="topic in course.topics.slice(0, 3)" :key="topic"
                class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {{ topic }}
              </span>
            </div>

            <div class="mb-6">
              <p class="text-gray-700">{{ course.description }}</p>
            </div>

            <div class="flex items-center mb-6">
              <div class="mr-4">
                <p class="text-sm text-gray-500">Giảng viên</p>
                <p class="font-medium">{{ course.instructor }}</p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6">
              <div>
                <p class="text-sm text-gray-500">Giá khóa học</p>
                <p class="text-3xl font-bold text-blue-600">{{ formatCurrency(course.price) }}</p>
              </div>

              <div class="flex space-x-4">
                <button v-if="!isPurchased" @click="handleBuyNow" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Mua ngay
                </button>
                <router-link v-else :to="`/courses/${course.slug}/learn`" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
                  Học ngay
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">Nội dung khóa học</h2>
          <div class="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cập nhật mới nhất
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Tài nguyên đính kèm
            </span>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <!-- Thông tin tổng quan về khóa học -->
          <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-center">
                <div class="mr-4 text-blue-600 bg-white p-3 rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">{{ course.topics.length }} chương học</h3>
                  <p class="text-gray-600">Nội dung chi tiết</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="mr-4 text-purple-600 bg-white p-3 rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">{{ course.duration }}</h3>
                  <p class="text-gray-600">Tổng thời lượng</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="mr-4 text-green-600 bg-white p-3 rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">Trực tiếp</h3>
                  <p class="text-gray-600">Hỗ trợ suốt khóa học</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tiến trình khóa học -->
          <div class="p-6 border-b border-gray-100" v-if="isPurchased">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-700">Tiến trình của bạn</h3>
              <span class="text-sm font-medium text-blue-600">25% hoàn thành</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: 25%"></div>
            </div>
          </div>
          
          <!-- Nội dung chi tiết khóa học -->
          <div class="p-0">
            <div class="divide-y divide-gray-100">
              <!-- Lặp qua các chủ đề khóa học -->
              <div v-for="(topic, index) in course.topics" :key="index" class="border-b border-gray-100 overflow-hidden">
                <div @click="toggleModule(index)" class="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-gray-50 transition-colors group">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 shadow-sm">
                      <span class="text-lg font-bold">{{ index + 1 }}</span>
                    </div>
                    <div>
                      <h3 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{{ topic }}</h3>
                      <p class="text-sm text-gray-500">Bài học {{ index + 1 }}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-500 mr-4">{{ 30 + (index * 10) }} phút</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors transform" :class="{ 'rotate-180': openModules[index] }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <!-- Nội dung chi tiết của module -->
                <div v-if="openModules[index]" class="bg-gray-50 px-5 py-4 border-t border-gray-100">
                  <ul class="space-y-3">
                    <!-- Bài học 1: Giới thiệu -->
                    <li class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-900">Giới thiệu về {{ topic }}</h4>
                          <p class="text-xs text-gray-500">Video - 15 phút</p>
                        </div>
                      </div>
                      <div>
                        <span v-if="isPurchased" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Đã xem
                        </span>
                        <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Khóa
                        </span>
                      </div>
                    </li>
                    
                    <!-- Bài học 2: Cài đặt môi trường -->
                    <li class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-900">Cài đặt môi trường {{ topic }}</h4>
                          <p class="text-xs text-gray-500">Bài tập - 20 phút</p>
                        </div>
                      </div>
                      <div>
                        <span v-if="isPurchased" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Đang làm
                        </span>
                        <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Khóa
                        </span>
                      </div>
                    </li>
                    
                    <!-- Bài học 3: Kiểm tra kiến thức -->
                    <li class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-900">Kiểm tra kiến thức</h4>
                          <p class="text-xs text-gray-500">Quiz - 10 phút</p>
                        </div>
                      </div>
                      <div>
                        <span v-if="isPurchased" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Chưa làm
                        </span>
                        <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Khóa
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <RelatedCourses 
          title="Khóa học liên quan" 
          :courses="relatedCourses" 
          :showNavigation="true" 
        />
      </div>
    </div>

    <CheckoutModal v-if="showCheckoutModal" :course="selectedCourse" @close="showCheckoutModal = false"
      @confirm="confirmPurchase" />
  </div>

  <div v-else class="container py-16 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24"
      stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="text-xl font-medium text-gray-900 mb-1">Không tìm thấy khóa học</h3>
    <p class="text-gray-500 mb-6">Khóa học này không tồn tại hoặc đã bị xóa</p>
    <router-link to="/courses" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">Xem tất cả khóa học</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '../stores/courses';
import { useWalletStore } from '../stores/wallet';
import CourseCard from '../components/CourseCard.vue';
import CourseCardSimple from '../components/CourseCardSimple.vue';
import RelatedCourses from '../components/RelatedCourses.vue';
import CheckoutModal from '../components/CheckoutModal.vue';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const walletStore = useWalletStore();

const courseSlug = computed(() => route.params.slug);
const course = computed(() => {
  // Sử dụng hàm getCourseBySlug để tìm khóa học theo slug
  return courseStore.getCourseBySlug(courseSlug.value);
});
const isPurchased = computed(() =>
  courseStore.getPurchasedCourses.some(c => c.id === course.value?.id)
);

const showCheckoutModal = ref(false);
const selectedCourse = ref(null);
const relatedCoursesContainer = ref(null);

// Quản lý trạng thái đóng/mở của các module
const openModules = ref({});

// Hàm để đóng/mở module
const toggleModule = (index) => {
  openModules.value[index] = !openModules.value[index];
};

// Get related courses (excluding the current course)
const relatedCourses = computed(() => {
  if (!course.value) return [];

  return courseStore.getAllCourses
    .filter(c =>
      c.id !== course.value.id &&
      (c.level === course.value.level ||
        c.topics.some(topic => course.value.topics.includes(topic)))
    )
    .slice(0, 6);
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

const handleBuyNow = () => {
  if (isPurchased.value) return;

  selectedCourse.value = course.value;
  showCheckoutModal.value = true;
};

const handleRelatedBuyNow = (relatedCourse) => {
  selectedCourse.value = relatedCourse;
  showCheckoutModal.value = true;
};

const confirmPurchase = () => {
  const result = walletStore.purchaseCourse(selectedCourse.value);

  if (result.success) {
    courseStore.addUserCourse(selectedCourse.value.id);
    alert('Mua khóa học thành công!');
  } else {
    alert(result.message);
  }

  showCheckoutModal.value = false;
};

// Hàm để cuộn ngang danh sách khóa học liên quan
const scrollRelatedCourses = (direction) => {
  if (!relatedCoursesContainer.value) return;
  
  const container = relatedCoursesContainer.value;
  const scrollAmount = 340; // Khoảng cách cuộn mỗi lần nhấp nút
  
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

// Không tự động chuyển hướng khi không tìm thấy khóa học
// Thay vào đó, hiển thị thông báo lỗi trong template
onMounted(() => {
  console.log('Course slug:', courseSlug.value);
  console.log('Found course:', course.value);
  
  // Mặc định mở module đầu tiên
  if (course.value && course.value.topics.length > 0) {
    openModules.value[0] = true;
  }
});
</script>

<style scoped>
/* Ẩn thanh cuộn nhưng vẫn cho phép cuộn */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Hiệu ứng snap scroll */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
</style>
