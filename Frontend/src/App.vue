<template>
  <div class="min-h-screen flex flex-col">
    <!-- Toast Container for notifications -->
    <ToastContainer />
    
    <!-- Header -->
    <header class="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <nav class="container py-3">
        <!-- Desktop Header -->
        <HeaderDesktop 
          :wallet-balance="walletBalance" 
          :recent-transactions="recentTransactions" 
          :user="user"
          :cart-count="cartCount"
          @show-deposit="showDepositModal = true"
          @logout="logout"
        />
        
        <!-- Mobile Header -->
        <HeaderMobile 
          :wallet-balance="walletBalance" 
          :cart-count="cartCount" 
          :user="user"
          @show-deposit="showDepositModal = true"
          @logout="logout"
        />
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>

    <!-- Footer -->
    <SiteFooter />
    
    <!-- Deposit Modal -->
    <DepositModal 
      :show="showDepositModal" 
      @close="showDepositModal = false" 
      @deposit="handleDeposit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWalletStore } from './stores/wallet';
import { useCartStore } from './stores/cart';
import { useRoute } from 'vue-router';
import ToastContainer from './components/ToastContainer.vue';
import HeaderDesktop from './components/HeaderDesktop.vue';
import HeaderMobile from './components/HeaderMobile.vue';
import SiteFooter from './components/SiteFooter.vue';
import DepositModal from './components/DepositModal.vue';

const route = useRoute();
const walletStore = useWalletStore();
const cartStore = useCartStore();
const walletBalance = computed(() => walletStore.balance);
const cartCount = computed(() => cartStore.cartCount);
const recentTransactions = computed(() => {
  return walletStore.getRecentTransactions.slice(0, 3);
});
const showDepositModal = ref(false);

// Mock user data
const user = ref({
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com'
});

const handleDeposit = (amount) => {
  if (amount < 10000) {
    alert('Số tiền nạp tối thiểu là 10,000 VND');
    return;
  }
  
  walletStore.addTransaction('deposit', amount, 'Nạp tiền vào ví');
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
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
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
