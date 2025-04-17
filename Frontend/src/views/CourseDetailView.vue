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
              <span v-for="topic in course.topics.slice(0, 3)" :key="topic" class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
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
              
              <button 
                @click="handleBuyNow" 
                class="btn btn-primary"
                :disabled="isPurchased"
              >
                {{ isPurchased ? 'Đã mua' : 'Mua ngay' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Nội dung khóa học</h2>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(topic, index) in course.topics" :key="index" class="border-b pb-4 last:border-b-0 last:pb-0">
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <h3 class="text-lg font-medium">{{ topic }}</h3>
                    <p class="text-gray-600">Bài học {{ index + 1 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Khóa học liên quan</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CourseCard 
            v-for="relatedCourse in relatedCourses" 
            :key="relatedCourse.id" 
            :course="relatedCourse"
            @buy-now="handleRelatedBuyNow"
          />
        </div>
      </div>
    </div>
    
    <CheckoutModal 
      v-if="showCheckoutModal" 
      :course="selectedCourse" 
      @close="showCheckoutModal = false"
      @confirm="confirmPurchase"
    />
  </div>
  
  <div v-else class="container py-16 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="text-xl font-medium text-gray-900 mb-1">Không tìm thấy khóa học</h3>
    <p class="text-gray-500 mb-6">Khóa học này không tồn tại hoặc đã bị xóa</p>
    <router-link to="/courses" class="btn btn-primary">Xem tất cả khóa học</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '../stores/courses';
import { useWalletStore } from '../stores/wallet';
import CourseCard from '../components/CourseCard.vue';
import CheckoutModal from '../components/CheckoutModal.vue';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const walletStore = useWalletStore();

const courseId = computed(() => route.params.id);
const course = computed(() => courseStore.getCourseById(courseId.value));
const isPurchased = computed(() => 
  courseStore.getPurchasedCourses.some(c => c.id === parseInt(courseId.value))
);

const showCheckoutModal = ref(false);
const selectedCourse = ref(null);

// Get related courses (excluding the current course)
const relatedCourses = computed(() => {
  if (!course.value) return [];
  
  return courseStore.getAllCourses
    .filter(c => 
      c.id !== parseInt(courseId.value) && 
      (c.level === course.value.level || 
       c.topics.some(topic => course.value.topics.includes(topic)))
    )
    .slice(0, 3);
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

onMounted(() => {
  if (!course.value) {
    router.push('/courses');
  }
});
</script>
