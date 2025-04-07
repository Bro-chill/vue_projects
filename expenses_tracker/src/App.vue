<template>
  <Header/>
  <div>
    <Balance :total="total"/>
    <IncomeExpenses :income="+income" :expenses="+expenses"/>
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue';

import {ref,computed,onMounted} from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const transactions = ref([])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if(savedTransactions){
    transactions.value = savedTransactions
  }
})


//Get total
const total = computed(() => {
  return transactions.value.reduce((acc,transaction) =>{
    return acc+transaction.amount
  },0)
})

//Get income
const income = computed(() => {
  return transactions.value
  .filter((transaction) => transaction.amount > 0)
  .reduce((acc,transaction) =>{
    return acc+transaction.amount
  },0)
  .toFixed(2)
})

//Get expenses
const expenses = computed(() => {
  return transactions.value
  .filter((transaction) => transaction.amount < 0)
  .reduce((acc,transaction) =>{
    return acc+transaction.amount
  },0)
  .toFixed(2)
})

//Delete transaction
const handleTransactionDeleted = (id) =>{
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

  toast.success('Transaction Deleted')

  saveTransactionsToLocalStorage()
}

//Submit transaction
const handleTransactionSubmitted = (transactionData) =>{
  transactions.value.push({
    id: generateUniqueID(),
    text: transactionData.text,
    amount: transactionData.amount
  })

  toast.success('Transaction Added')

  saveTransactionsToLocalStorage()
}

const generateUniqueID = () => {
  return Math.floor(Math.random()*1000)
}

//Save to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>