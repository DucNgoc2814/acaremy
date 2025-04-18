<template>
  <div>
    <!-- Unique full-width banner section with diagonal design -->
    <section class="relative w-full bg-gradient-to-r from-indigo-800 via-blue-700 to-blue-600 overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>
        <div class="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-blue-500 opacity-20"></div>
        <div class="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-indigo-500 opacity-20"></div>
      </div>
      
      <!-- Content container with diagonal layout -->
      <div class="relative w-full py-10 md:py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h1 class="text-xl md:text-2xl font-bold mb-3 text-white leading-tight">
                Nâng cao kỹ năng <span class="text-yellow-300">của bạn</span> với các khóa học trực tuyến
              </h1>
              <p class="text-xs md:text-sm mb-4 text-blue-100">
                Học từ các chuyên gia hàng đầu với các khóa học chất lượng cao
              </p>
              <router-link to="/courses" class="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-4 py-1.5 rounded-md text-xs font-medium shadow-md transition-colors">
                Khám phá khóa học
              </router-link>
            </div>
            <div class="md:w-1/2 relative">
              <div class="relative z-10 bg-white p-2 rounded-md shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                     alt="Online Learning" 
                     class="w-full h-auto rounded"
                />
              </div>
              <div class="absolute top-6 -right-3 w-16 h-16 bg-yellow-400 rounded-md shadow-md transform -rotate-12 opacity-80 z-0"></div>
              <div class="absolute bottom-6 -left-3 w-12 h-12 bg-indigo-500 rounded-md shadow-md transform rotate-45 opacity-80 z-0"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Wave separator -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-6 md:h-8">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white"></path>
        </svg>
      </div>
    </section>
    
    <!-- Featured courses section with updated design -->
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center mb-6">
          <div class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-2">
            KHÓA HỌC NỔI BẬT
          </div>
          <h2 class="text-lg md:text-xl font-bold text-center text-gray-900">
            Bắt đầu hành trình học tập của bạn
          </h2>
          <div class="w-12 h-0.5 bg-yellow-400 mt-2"></div>
        </div>
        
        <!-- Updated grid layout with 6 columns -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <CourseCard 
            v-for="course in displayedCourses" 
            :key="course.id" 
            :course="course"
            :purchased-ids="purchasedCourseIds"
            @buy-now="handleBuyNow"
          />
        </div>
        
        <div class="text-center mt-6">
          <router-link to="/courses" class="inline-block px-4 py-1.5 bg-indigo-700 text-white hover:bg-indigo-700 rounded-md text-xs font-medium shadow-md transition-colors">
            Xem tất cả khóa học
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Featured Products Section -->
    <section class="py-8 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center mb-6">
          <div class="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium mb-2">
            SẢN PHẨM GIẢM GIÁ
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-1">Sản phẩm nổi bật</h2>
          <p class="text-sm text-gray-600 text-center max-w-xl">Các sản phẩm hỗ trợ việc học tập với ưu đãi đặc biệt</p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <ProductCard 
            v-for="product in discountedProducts" 
            :key="product.id" 
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
        
        <div class="text-center mt-6">
          <router-link to="/products" class="inline-block px-4 py-1.5 bg-indigo-700 text-white hover:bg-indigo-700 rounded-md text-xs font-medium shadow-md transition-colors">
            Xem tất cả sản phẩm
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Why choose us section with updated design -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center mb-6">
          <div class="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-2">
            TẠI SAO CHỌN CHÚNG TÔI
          </div>
          <h2 class="text-lg md:text-xl font-bold text-center text-gray-900">
            Những lợi ích khi học tại đây
          </h2>
          <div class="w-12 h-0.5 bg-indigo-600 mt-2"></div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Học mọi lúc, mọi nơi</h3>
            <p class="text-xs text-gray-600 text-center">Truy cập khóa học từ mọi thiết bị</p>
          </div>
          
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Giá cả hợp lý</h3>
            <p class="text-xs text-gray-600 text-center">Học phí phù hợp với mọi đối tượng</p>
          </div>
          
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Bảo mật thanh toán</h3>
            <p class="text-xs text-gray-600 text-center">Thanh toán an toàn với ví điện tử</p>
          </div>
          
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Học không giới hạn</h3>
            <p class="text-xs text-gray-600 text-center">Truy cập suốt đời sau khi mua</p>
          </div>
          
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Cộng đồng học tập</h3>
            <p class="text-xs text-gray-600 text-center">Kết nối với học viên khác</p>
          </div>
          
          <div class="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-center text-gray-900 mb-1">Chứng chỉ</h3>
            <p class="text-xs text-gray-600 text-center">Nhận chứng chỉ sau khi hoàn thành</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  <!-- Purchase Modal -->
  <div v-if="showPurchaseModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header with close button -->
      <div class="flex items-center justify-between p-4 rounded-t bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h3 class="text-xl font-semibold">{{ selectedCourse.title }}</h3>
        <button @click="showPurchaseModal = false" type="button" class="text-white bg-transparent hover:bg-blue-700 rounded-full text-sm p-1.5 ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
      
      <p class="text-sm text-gray-600 px-6 pt-4">{{ selectedCourse.description || 'Xây dựng ứng dụng Vue.js với framework Nuxt.js để tối ưu SEO và hiệu suất.' }}</p>
      
      <div class="md:flex">
        <!-- Course Info -->
        <div class="md:w-1/2 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Thông tin khóa học</h3>
          
          <div class="space-y-5">
            <!-- Thời lượng -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Thời lượng</p>
                <p class="text-sm text-gray-600">{{ selectedCourse.duration || '10' }} giờ giờ học</p>
              </div>
            </div>
            
            <!-- Cấp độ -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Cấp độ</p>
                <p class="text-sm text-gray-600">{{ selectedCourse.level || 'Trung cấp' }}</p>
              </div>
            </div>
            
            <!-- Ngôn ngữ -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Ngôn ngữ</p>
                <p class="text-sm text-gray-600">Tiếng Việt</p>
              </div>
            </div>
            
            <!-- Học viên -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Học viên</p>
                <p class="text-sm text-gray-600">người đã đăng ký</p>
              </div>
            </div>
            
            <!-- Chứng chỉ -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Chứng chỉ</p>
                <p class="text-sm text-gray-600">Có chứng chỉ hoàn thành</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Payment Info -->
        <div class="md:w-1/2 p-6 border-l border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Thanh toán</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Giá khóa học:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(selectedCourse.price) }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">Thuế VAT (10%):</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(selectedCourse.price * 0.1) }}</span>
            </div>
            
            <div class="flex justify-between pt-3 border-t border-gray-200 mb-4">
              <span class="font-medium text-gray-900">Tổng thanh toán:</span>
              <span class="font-bold text-blue-600">{{ formatCurrency(selectedCourse.price * 1.1) }}</span>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-md mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Số dư ví:</span>
                <span class="font-medium text-blue-600">{{ formatCurrency(walletBalance) }}</span>
              </div>
              
              <div class="flex justify-between mt-2">
                <span class="text-gray-600">Số dư còn lại:</span>
                <span class="font-medium" :class="{'text-red-600': walletBalance < selectedCourse.price * 1.1, 'text-green-600': walletBalance >= selectedCourse.price * 1.1}">
                  {{ formatCurrency(walletBalance - (selectedCourse.price * 1.1)) }}
                </span>
              </div>
            </div>
            
            <!-- Warning if insufficient balance -->
            <div v-if="walletBalance < selectedCourse.price * 1.1" class="bg-red-50 border border-red-100 rounded-md p-3 flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-sm text-red-700">Số dư không đủ để thanh toán. Vui lòng nạp thêm tiền.</p>
            </div>
            
            <div class="pt-2">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Bạn sẽ nhận được:</h4>
              <ul class="space-y-2">
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Truy cập trọn đời vào khóa học
                </li>
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Chứng chỉ hoàn thành
                </li>
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Hỗ trợ kỹ thuật 24/7
                </li>
              </ul>
            </div>
          </div>
          
          <div class="flex space-x-3 pt-4 mt-4">
            <button @click="showPurchaseModal = false" class="w-1/3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Hủy
            </button>
            <button 
              @click="confirmPurchase" 
              type="button"
              class="w-2/3 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              :disabled="walletBalance < (selectedCourse.price * 1.1)"
              :class="{'opacity-50 cursor-not-allowed': walletBalance < (selectedCourse.price * 1.1)}"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWalletStore } from '../stores/wallet';
import { showSuccess, showError, initSweetAlert } from '../utils/alert';
import toastService from '../services/toastService';
import { useCartStore } from '../stores/cart';
import CourseCard from '../components/CourseCard.vue';
import ProductCard from '../components/ProductCard.vue';
import coursesData from '../data/courses.js';
import productsData from '../data/products.js';

const walletStore = useWalletStore();
const cartStore = useCartStore();
const walletBalance = computed(() => walletStore.balance);

// Course data
const allCourses = ref(coursesData);
const displayedCourses = computed(() => {
  return allCourses.value
    .filter(course => !purchasedCourseIds.value.includes(course.id))
    .slice(0, 6);
});
const purchasedCourseIds = ref([]);

// Product data
const products = ref(productsData);

// Featured courses (limit to 6)
const featuredCourses = computed(() => {
  return allCourses.value
    .filter(course => !purchasedCourseIds.value.includes(course.id))
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 6);
});

// Discounted products (limit to 6)
const discountedProducts = computed(() => {
  return products.value
    .filter(product => product.discountPercent > 0)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 6);
});

// Purchase modal state
const showPurchaseModal = ref(false);
const selectedCourse = ref(null);

// Handle buy now button click
const handleBuyNow = (course) => {
  selectedCourse.value = course;
  showPurchaseModal.value = true;
};

// Add product to cart
const addToCart = (product) => {
  cartStore.addToCart(product);
  
  // Show a beautiful toast notification instead of alert
  toastService.showCartNotification(
    `Đã thêm "${product.title}" vào giỏ hàng!`,
    'Giỏ hàng đã cập nhật',
    {
      duration: 3000,
      showProgressBar: true
    }
  );
};

// Confirm purchase
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
    allCourses.value[courseIndex].sales = (allCourses.value[courseIndex].sales || 0) + 1;
  }
  
  // Update wallet
  walletStore.addTransaction('purchase', totalPrice, `Mua khóa học: ${selectedCourse.value.title}`);
  
  // Show success message
  showSuccess('Khóa học đã được thêm vào danh sách khóa học của bạn!', 'Mua khóa học thành công!');
  
  // Close modal and reset selected course
  showPurchaseModal.value = false;
  console.log('Purchase completed successfully');
};

// Format currency to Vietnamese format
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Initialize SweetAlert when component is mounted
onMounted(() => {
  initSweetAlert();
});
</script>
