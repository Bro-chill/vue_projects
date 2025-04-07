<template>
    <h3>Add New Transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" placeholder="Enter text.." v-model="text">
        </div>
        <div class="form-control">
            <label for="amount">
                Amount<br/>(-ve = expense, +ve = income)
            </label>
            <input type="text" id="amount" placeholder="Enter amount.." v-model="amount">
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const text = ref('')
const amount = ref('')

const emit = defineEmits(['transactionSubmitted'])

const onSubmit = () => {
    if(!text.value || !amount.value){
        toast.error('Both fields need to be filled')
        return
    }

    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value)
    }

    emit('transactionSubmitted',transactionData)

    text.value = ''
    amount.value = ''
}
</script>