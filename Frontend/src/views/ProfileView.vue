<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Thông tin tài khoản</h1>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Profile Header -->
        <div class="bg-indigo-600 px-6 py-4">
          <div class="flex items-center">
            <div class="bg-white rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">{{ user.name }}</h2>
              <p class="text-indigo-200">Thành viên từ {{ formatDate(user.joinDate) }}</p>
            </div>
          </div>
        </div>
        
        <!-- Profile Content -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personal Information -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Thông tin cá nhân</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input 
                    type="text" 
                    v-model="user.name" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    v-model="user.email" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled
                  />
                  <p class="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input 
                    type="tel" 
                    v-model="user.phone" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <!-- Account Settings -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Cài đặt tài khoản</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                  <input 
                    type="password" 
                    v-model="currentPassword" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                  <input 
                    type="password" 
                    v-model="newPassword" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                  <input 
                    type="password" 
                    v-model="confirmPassword" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notification Settings -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Cài đặt thông báo</h3>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Thông báo khóa học mới</h4>
                  <p class="text-xs text-gray-500">Nhận thông báo khi có khóa học mới được phát hành</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.newCourses" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Thông báo khuyến mãi</h4>
                  <p class="text-xs text-gray-500">Nhận thông báo về các chương trình khuyến mãi và giảm giá</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.promotions" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Cập nhật tài khoản</h4>
                  <p class="text-xs text-gray-500">Nhận thông báo về các thay đổi liên quan đến tài khoản</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.accountUpdates" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-8 flex justify-end space-x-3">
            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Hủy
            </button>
            <button @click="saveProfile" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// User data
const user = ref({
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0987654321',
  joinDate: '2025-01-15T00:00:00.000Z'
});

// Password change
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Notification settings
const notifications = ref({
  newCourses: true,
  promotions: false,
  accountUpdates: true
});

// Save profile changes
function saveProfile() {
  // Validate password change if attempted
  if (newPassword.value) {
    if (!currentPassword.value) {
      alert('Vui lòng nhập mật khẩu hiện tại');
      return;
    }
    
    if (newPassword.value !== confirmPassword.value) {
      alert('Mật khẩu mới không khớp');
      return;
    }
    
    if (newPassword.value.length < 8) {
      alert('Mật khẩu mới phải có ít nhất 8 ký tự');
      return;
    }
  }
  
  // In a real app, this would call an API to update the profile
  alert('Cập nhật thông tin thành công!');
  
  // Reset password fields
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
</script>
