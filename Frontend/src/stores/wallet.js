import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const balance = ref(1000000)
  const transactions = ref([
    {
      id: 1,
      type: 'deposit',
      amount: 1000000,
      description: 'Initial deposit',
      date: new Date(2025, 3, 15).toISOString()
    }
  ])

  // Getters
  const getTransactionsByType = computed(() => (type) => {
    return transactions.value.filter(transaction => transaction.type === type)
  })

  const getRecentTransactions = computed(() => {
    return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  // Actions
  function addTransaction(type, amount, description) {
    const transaction = {
      id: transactions.value.length + 1,
      type,
      amount,
      description,
      date: new Date().toISOString()
    }
    
    transactions.value.push(transaction)
    
    if (type === 'deposit') {
      balance.value += amount
    } else if (type === 'purchase') {
      balance.value -= amount
    }
    
    return transaction
  }

  function purchaseCourse(course) {
    if (balance.value < course.price) {
      return { success: false, message: 'Insufficient balance' }
    }
    
    addTransaction('purchase', course.price, `Purchase: ${course.title}`)
    
    return { success: true, message: 'Course purchased successfully' }
  }

  return { 
    balance, 
    transactions, 
    getTransactionsByType, 
    getRecentTransactions,
    addTransaction,
    purchaseCourse
  }
})
