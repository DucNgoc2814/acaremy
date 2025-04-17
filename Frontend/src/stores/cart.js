import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // State
  const cartItems = ref(loadCartFromLocalStorage());
  
  // Load cart from localStorage
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  
  // Save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
  
  // Watch for changes and update localStorage
  watch(cartItems, () => {
    saveCartToLocalStorage();
  }, { deep: true });
  
  // Getters
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });
  
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const price = item.discountedPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  });
  
  // Actions
  function addToCart(product) {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    
    if (existingItem) {
      // If product already exists, increase quantity
      existingItem.quantity += product.quantity || 1;
    } else {
      // Otherwise add new item
      cartItems.value.push({
        ...product,
        quantity: product.quantity || 1
      });
    }
    
    saveCartToLocalStorage();
  }
  
  function removeFromCart(productId) {
    const index = cartItems.value.findIndex(item => item.id === productId);
    
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      saveCartToLocalStorage();
    }
  }
  
  function updateQuantity(productId, quantity) {
    const item = cartItems.value.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCartToLocalStorage();
      }
    }
  }
  
  function clearCart() {
    cartItems.value = [];
    saveCartToLocalStorage();
  }
  
  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
});
